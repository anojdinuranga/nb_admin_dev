/**
 * @Description 
 * This is date time format function
 * @author
 * R.M. Kavindu Nimesh
 * @END
 */

const luxon    = require('luxon');

const dateTime = async ( dTime, format = '', timeZone = '', type = 1 ) => {

    /**
     * @detail
     * Types
     *  1 - nothing
     *  2 - date only
     */

    if (type === 2 ) {
        return dTime;
    }

    dTime = (JSON.stringify(dTime));

    dTime = luxon.DateTime.utc(parseInt(dTime.substr(1,4)), parseInt(dTime.substr(6,2)), parseInt(dTime.substr(9,2)), parseInt(dTime.substr(12,2)), parseInt(dTime.substr(15,2)), parseInt(dTime.substr(18,2))).setZone(timeZone).toFormat(format);

    return ( {"status":true, "dateTime":dTime, "timeZone": timeZone} );

};

function isValidDate(dateStr) {
    // Regular expressions for the supported date formats
    const regexes = [
      /^(\d{4})-(\d{2})-(\d{2})$/,   // YYYY-MM-DD
      /^(\d{4})\/(\d{2})\/(\d{2})$/, // YYYY/MM/DD
      /^(\d{2})\/(\d{2})\/(\d{4})$/, // MM/DD/YYYY
      /^(\d{2})-(\d{2})-(\d{4})$/,   // MM-DD-YYYY
      /^(\d{2})-(\d{2})-(\d{4})$/,   // DD-MM-YYYY
      /^(\d{2})\/(\d{2})\/(\d{4})$/  // DD/MM/YYYY
    ];
  
    // Iterate over the regular expressions and test the date string against each one
    for (let i = 0; i < regexes.length; i++) {
      if (regexes[i].test(dateStr)) {
        // If a match is found, return true (i.e. the date string is valid)
        return true;
      }
    }
    
    // If none of the regular expressions match, return false (i.e. the date string is invalid)
    return false;
}

function formatDate(inputDate) {

    // Replace any separators (i.e. "/", "-") with a single "-"
    let dateStr = inputDate.replace(/[/\-]/g, "-");
    
    // Create a new Date object using the parsed date string
    let dateObj = new Date(dateStr);
    
    // Extract the year, month, and day from the date object
    let year = dateObj.getFullYear();
    let month = String(dateObj.getMonth() + 1).padStart(2, '0');
    let day = String(dateObj.getDate()).padStart(2, '0');
    
    // Combine the year, month, and day into the desired format
    let formattedDate = `${year}-${month}-${day}`;
    
    return formattedDate;

  }

  function formatDateTime(dateString) {
    var date = new Date(dateString);
   
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);

   var formattedDateString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

   return formattedDateString;
}

module.exports = {
    dateTime,
    isValidDate,
    formatDate,
    formatDateTime
};