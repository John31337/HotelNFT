//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.0;

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with GSN meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

pragma solidity ^0.6.8;
interface IBookingToken {
    function burn(uint256 _tokenId) external;
}

contract Booking is Context{
    struct BookingData {
        address booker;
        uint256 tokenId;
        uint256 time;
    }

    address public hotel;

    mapping(address => uint256) public bookingCounts;
    mapping(address => mapping(uint256 => BookingData)) public bookings;

    function book(address _bookingToken, address _hotel, address _booker, uint256 _time, uint256 _tokenId) public virtual {
        _book(_bookingToken, _hotel, _booker, _time, _tokenId);
    }

    function getBookData(address _hotel, uint256 index) public view returns(address)
    {
        return bookings[_hotel][index].booker;
    }

    function _book(address bookingToken, address _hotel, address _booker,  uint256 _time, uint256 _tokenId) internal{
        uint256 index = bookingCounts[_hotel];
        BookingData memory bookingData = BookingData(
            _booker,
            _time,
            _tokenId
        );

        IBookingToken bookingContract = IBookingToken(bookingToken);
        bookingContract.burn(_tokenId);

        bookings[_hotel][index] = bookingData;
        bookingCounts[_hotel] = index + 1;
    }
}