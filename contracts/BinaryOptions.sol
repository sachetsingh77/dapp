pragma solidity ^0.4.15;

contract BinaryOptions {

    address public owner;

    enum Result { Unresolved, Yes, No, Undecided } //generic. some betting events may be undecided "Tie"
    
    struct Option {
        string optionCode; //e.g. BTC-45000 : BTC will be more than 45000 USD before expiry, ETH-3500
        bytes32 identifier;
        string description;
        uint expiryBlock;
        bool resolved;
        Result result;
        uint totalPot;                
        mapping(uint8 => uint) betsByOutcome; 
    }

    struct Bet {
        uint amount;
        Result predictedResult;
        bool paidOut;
    }

    mapping(uint => Option) public optionsArray;
    uint public optionsCount;
    mapping(bytes32 => Option) public Options;
    
    uint public commission;
    uint public minAmount = 1000000;
    uint public maxAmount = 1000000000;
    
    function setCommission(uint commissionInput) isOwner() public{
        commission = commissionInput;
    }
    function setMinAmount(uint min) isOwner() public{
        minAmount = min;
    }
    function setMaxAmount(uint max) isOwner() public{
        maxAmount = max;
    }

    mapping(address => mapping(bytes32 => Bet)) public Bets;

    event OptionPaid(address indexed winner, uint value, uint totalPot, uint ratio);

    constructor () public {
        owner = msg.sender;
    }

    function getResultBalance(bytes32 identifier, Result result)
        isValidResult(result)
        public 
        constant 
        returns(uint balance) {
            return Options[identifier].betsByOutcome[uint8(result)];
    }

    function getTotalPot(bytes32 identifier) 
        public
        constant 
        returns(uint totalPot) {
            return Options[identifier].totalPot;
    }    
       
    function addBinaryOption(string optionCode, string description, uint durationInBlocks) isOwner() public returns(bool success){
        bytes32 id = keccak256(abi.encodePacked(optionCode, description, durationInBlocks));
        return addBinaryOption(id, optionCode, description, durationInBlocks);
    }   
    function addBinaryOption(bytes32 identifier, string optionCode, string description, uint durationInBlocks)
        isOwner()
        private returns(bool success) {
        
        require(durationInBlocks > 0);

        require(Options[identifier].expiryBlock == 0);

        Option memory option;
        option.expiryBlock = block.number + durationInBlocks;
        option.optionCode = optionCode;
        option.identifier = identifier;
        option.description = description;
        option.resolved = false;
        option.result = Result.Unresolved;
        Options[identifier] = option;
        optionsArray[optionsCount] = option;
        optionsCount ++;
        return true;
    }
    function placeBet(bytes32 identifier, Result result) public
        isValidResult(result)
        payable returns(bool success) {

        require(msg.value > 0);

        require(Options[identifier].expiryBlock > 0);

        require(Options[identifier].expiryBlock >= block.number);

        require(!Options[identifier].resolved);

        require(Bets[msg.sender][identifier].amount == 0);

        Option storage option = Options[identifier];

        option.betsByOutcome[uint8(result)] += msg.value;
        option.totalPot += msg.value;

        Bet memory bet;
        bet.amount = msg.value;
        bet.predictedResult = result;
        Bets[msg.sender][identifier] = bet;

        return true;
    }
    
    function resolveOption(bytes32 identifier) 
        isOwner()
        public 
        returns(bool success) {
            
        require(option.expiryBlock < block.number);
        Option storage option = Options[identifier];
        option.resolved = true;
        
        return true;
    }
    
    function setOptionResult(bytes32 identifier, Result result) 
        isOwner()
        public
        returns(bool success) {
            
        require(option.expiryBlock < block.number);
        Option storage option = Options[identifier];
        require(option.resolved);
        require(result == Result.Yes || result == Result.No || result == Result.Undecided);
        option.result = result;
        
        return true;        
    }
    function receivePayment(bytes32 identifier)
        public 
        returns(bool success) {
        
        Option storage option = Options[identifier];
        require(option.expiryBlock < block.number);
        require(option.resolved);
        
        Bet storage bet = Bets[msg.sender][identifier];
        require(bet.amount > 0);
        require(!bet.paidOut);
        
        uint totalPot = option.totalPot;
        uint ResultBalance = getResultBalance(identifier, bet.predictedResult);

        uint r = 1;

        if (option.result != Result.Undecided) {
            require(bet.predictedResult == option.result);
            
            r = totalPot / ResultBalance;
        }
        
        uint payoutAmount = r * bet.amount;

        bet.paidOut = true;
        option.totalPot -= payoutAmount;
        msg.sender.transfer(payoutAmount);
        emit OptionPaid(msg.sender, payoutAmount, option.totalPot, r);
        return true;
    }

    function kill() isOwner() public {
        selfdestruct(owner);
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier isValidResult(Result result) {
        require(result == Result.Yes || result == Result.No);
        _;
    }
}
