// Add your javascript here

/**
 * Created by Jitendra on 7/18/2015.
 */


(function($){

    $(document).ready(function() {


        //On Focus
        $('input').focus(function(){
            //Check to see if the user has modified the input, if not then remove the placeholder text
            if($(this).val() === $(this).attr("placeholder")){
                $(this).val("");
            }
        });

        //On Blur
        $('input').blur(function(){
            //Check to see if the use has modified the input, if not then populate the placeholder back into the input
            if( $(this).val() === ""){
                $(this).val($(this).attr("placeholder"));
            }
        });




        /* start of home page validations */

        /* start of "Find a table" validations */
        var btnFindATable=$('div.divCreateReservation>a.button');
        btnFindATable.on('click',function() { validateFindATableFields(event) });
        function validateFindATableFields(event)
        {
            var errorMessage="";
            var inputTime=$('span.TableReservationDetails>input[name="inputTime"]');
            var time=inputTime.val();
            var inputdate=$('span.TableReservationDetails>input[name="inputDate"]');
            var date=inputdate.val();
            var dateFlag=validateDate(event,date);
            var timeFlag=validateTime(event,time);
            var findATableErrorMessage=$('div.divCreateReservation +  .error-msg');
            if(!dateFlag)
            {
                errorMessage+=' date value should be in yyyy-mm-dd  format ; ';
            }
            if(!timeFlag)
            {
                errorMessage+=' please enter time in hh:mm ,i.e, 24-hour clock format ';
                findATableErrorMessage.html(errorMessage+'<br/>');
            }


            if(dateFlag && timeFlag)
            {
                findATableErrorMessage.css("display","none").text("");
                $('#liHome').prop('class','');
                btnFindATable.prop('href','#createReservation');
            }
            else
            {
                findATableErrorMessage.css("display","block").text(errorMessage);
                btnFindATable.prop('href','#');
            }
            console.log(errorMessage);
        }

        function validateTime(event,time)
        {
            var regexTime=/^\d{1,2}:\d{1,2}$/;
            // check for pattern
            if(!regexTime.test(time))
            {
                return false;
            }
            // check for value
            var fields =time.split(":");
            var hours=parseInt(fields[0],10);
            var minutes=parseInt(fields[1],10);
            console.log(hours +" "+minutes);
            if(!(hours>=0 && hours<=23) || !(minutes>=0 && minutes<=59))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        function validateDate(event,date)
        {
            /* start for date validations */
            var regexDate =/^\d{4}\-\d{1,2}\-\d{1,2}$/;
            // check for pattern
            if(!regexDate.test(date))
            {
                return false;
            }

            // check for value
            // Convert date fields to integers
            var fields   = date.split("-");
            var day     = parseInt(fields[2], 10);
            var month   = parseInt(fields[1], 10);
            var year    = parseInt(fields[0], 10);

            // Check the ranges of month and year
            if(year < 1000 || year > 3000 || month === 0 || month > 12)
            {
                return false;
            }

            var lengthOfMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

            // Consider leap years
            if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
            {
                lengthOfMonth[1] = 29;
            }

            // Check the range of the day
            if(day > 0 && day <= lengthOfMonth[month - 1])
            {
                return true;
            }
            else
            {
                return false;
            }
            /* end of date validation */
        }


        /* end of "Find a table" validations */

        /* start of "Edit Reservation " validations */
        var btnEditReservation=$('div.divEditReservation>a.button');
        btnEditReservation.on('click',function(){ validateConfirmationCode(event)});
        function validateConfirmationCode(event)
        {
            var textBoxConfirmationCode=$('span.EditReservationDetails input[name="confirmationCode"]');
            var confirmationCode=textBoxConfirmationCode.val();
            var editReservationErrorMessage=$('div.divEditReservation+.error-msg');
            var confirmationCodeFlag=validateTextBox(event,confirmationCode);
            if(confirmationCodeFlag)
            {
                editReservationErrorMessage.css("display","none").text("");
                $('#liHome').prop('class','');
                btnEditReservation.prop('href','#editReservation');
            }
            else
            {
                editReservationErrorMessage.css("display","block").text('Please enter confirmation code');
                btnEditReservation.prop('href','#');
            }
        }

        function validateTextBox(event,text)
        {
            if(text==='')
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        /* end of "Edit Reservation" validations */


        /* end of home page validaations */



        /* start of "Create Reservation" validations */
        var btnReserve=$('div.createReservationFields>.button');
        btnReserve.on('click',function() { validateReservationFields(event) });

        function validateReservationFields(event)
        {
            console.log('i am in validate reservation section');
            var textBoxFirstName=$('span.createReservationFields>input[name="FirstName"]');
            var firstName=textBoxFirstName.val();
            var textBoxLastName=$('span.createReservationFields>input[name="LastName"]');
            var lastName=textBoxLastName.val();
            var textTelephone=$('span.createReservationFields>input[name="Telephone"]');
            var telephone=textTelephone.val();
            var firstNameFlag=validateTextBox(event,firstName);
            var firstNameErrorMessage=$('#FirstName+.error-msg');
            if(firstNameFlag)
            {
                firstNameErrorMessage.css("display","none").text("");
            }
            else
            {
                firstNameErrorMessage.css("display","block").text('Please fill your FirstName');
            }
            var lastNameFlag=validateTextBox(event,lastName);
            var lastNameErrorMessage=$('#LastName+.error-msg');
            if(lastNameFlag)
            {
                lastNameErrorMessage.css("display","none").text("");
            }
            else
            {
                lastNameErrorMessage.css("display","block").text('Please fill your LastName');
            }
            var telephoneFlag=validateTelephone(event,telephone);
            var telephoneErrorMessage=$('#Telephone+.error-msg');
            if(telephoneFlag)
            {
                telephoneErrorMessage.css("display","none").text("");
            }
            else
            {
                telephoneErrorMessage.css("display","block").text('Please enter valid telephone');
            }


        }

        function validateTelephone(event,telephone)
        {
            /* start of telephone number validation*/

            var reg1=/^[1-9]\d{2}-\d{3}-\d{4}$/;
            var reg2=/^\([1-9]\d{2}\)\s\d{3}-\d{4}$/;
            return (reg1.test(telephone) || reg2.test(telephone));

            /* end of telephone number validation */

        }

        /* end of "Create Reservation" validations */


        /* start of "Update Reservation" validations */

        var btnUpdateReservation=$('#btnUpdateReservation');
        btnUpdateReservation.on('click',function() { validateUpdateReservationFields(event) });
        function validateUpdateReservationFields(event)
        {
            var errorMessage="";
            var inputTime=$('span.editReservationInputFields>input[name="inputTime"]');
            var time=inputTime.val();
            var inputdate=$('span.editReservationInputFields>input[name="inputDate"]');
            var date=inputdate.val();
            var dateFlag=validateDate(event,date);
            var timeFlag=validateTime(event,time);
            var updateReservationErrorMessage=$('#editReservation .error-msg');
            var textTelephone=$('span.editReservationInputFields>input[name="telephone"]');
            var telephone=textTelephone.val();
            var telephoneFlag=validateTelephone(event,telephone);
            if(!dateFlag)
            {
                errorMessage+=' date value should be in yyyy-mm-dd  format ; ';
            }
            if(!timeFlag)
            {
                errorMessage+=' please enter time in hh:mm ,i.e, 24-hour clock format ';
            }

            if(!telephoneFlag)
            {
                errorMessage+=' Please enter valid telephone ';
            }

            if(dateFlag && timeFlag && telephoneFlag)
            {
                updateReservationErrorMessage.css("display","none").text("");
            }
            else
            {
                updateReservationErrorMessage.css("display","block").text(errorMessage);
            }


        }


        /* end of "Update Reservation" validations */

    } )

}

)(jQuery)
