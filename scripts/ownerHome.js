/**
 * Created by Jitendra Malakalapalli on 7/25/2015.
 */

function onViewReservationClick()
{
    document.getElementById("idViewReservation").className="";
}

(function($){

    $(document).ready(function(){

        /* start of profile validations */
        var btnUpdateProfile=$('span.spanProfile>.button');
        btnUpdateProfile.on('click',function() { validateProfileFields(event) });

        function validateProfileFields(event)
        {
            var textBoxFirstName=$('span.spanProfile>input[name="profileFirstName"]');
            var firstName=textBoxFirstName.val();
            var textBoxLastName=$('span.spanProfile>input[name="profileLastName"]');
            var lastName=textBoxLastName.val();
            var textTelephone=$('span.spanProfile>input[name="profileTelephone"]');
            var telephone=textTelephone.val();
            var firstNameFlag=validateTextBox(event,firstName);
            var firstNameErrorMessage=$('#ProfileFirstName+.error-msg');
            if(firstNameFlag)
            {
                firstNameErrorMessage.css("display","none").text("");
            }
            else
            {
                firstNameErrorMessage.css("display","block").text('Please fill your FirstName');
            }
            var lastNameFlag=validateTextBox(event,lastName);
            var lastNameErrorMessage=$('#ProfileLastName+.error-msg');
            if(lastNameFlag)
            {
                lastNameErrorMessage.css("display","none").text("");
            }
            else
            {
                lastNameErrorMessage.css("display","block").text('Please fill your LastName');
            }
            var telephoneFlag=validateTelephone(event,telephone);
            var telephoneErrorMessage=$('#ProfileTelephone+.error-msg');
            if(telephoneFlag)
            {
                telephoneErrorMessage.css("display","none").text("");
            }
            else
            {
                telephoneErrorMessage.css("display","block").text('Please enter valid telephone');
            }
            var textEmail=$('span.spanProfile>input[name="profileEmail"]');
            var email=textEmail.val();
            var emailFlag=validateEmail(event,email);
            var emailErrorMessage=$('#ProfileEmail+.error-msg')
            if(emailFlag)
            {
                emailErrorMessage.css("display","none").text("");
            }
            else
            {
                emailErrorMessage.css("display","block").text('Please enter valid email id');
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


        function validateTelephone(event,telephone)
        {
            /* start of telephone number validation*/

            var reg1=/^[1-9]\d{2}-\d{3}-\d{4}$/;
            var reg2=/^\([1-9]\d{2}\)\s\d{3}-\d{4}$/;
            return (reg1.test(telephone) || reg2.test(telephone));

            /* end of telephone number validation */

        }


        function validateEmail(event,email)
        {
            var regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if(!regexEmail.test(email))
            {
                console.log('please enter valid email address');
                return false;
            }
            else
            {
                console.log('email success');
                return true;
            }
        }


        /* end of profile validations */


        /* start of Settings validations */
        var btnUpdateSettings=$('.sectionSettings .button');
        btnUpdateSettings.on('click',function() { validateSettingsFields(event) });
        var settingsErrorMessage=$('.sectionSettings .error-msg');

        function validateSettingsFields(event)
        {
           var errorMessage="";
           var statusAutoAssign=$('.sectionSettings input[name="autoAssign"]').is(':checked');
           if(!statusAutoAssign)
           {
               errorMessage+=' Please select auto assign setting ;';
           }
          var restaurantOpenTimings=$('#restaurantOpenTimings').val();
          var restaurantOpenTimingsFlag=validateTime(event,restaurantOpenTimings);

            if(!restaurantOpenTimingsFlag)
            {
                errorMessage+=' Please enter valid Open Timings ;';
            }

            var restaurantCloseTimings=$('#restaurantCloseTimings').val();
            var restaurantCloseTimingsFlag=validateTime(event,restaurantCloseTimings);

            if(!restaurantCloseTimingsFlag)
            {
                errorMessage+=' Please enter valid Closing Timings ;';
            }

            var statusRestaurantOpenDays=$('.sectionSettings input[name="Opendays"]').is(':checked');
            if(!statusRestaurantOpenDays)
            {
                errorMessage+=' Please select Restaurant Open Days ;';
            }
            var statusRestaurantClosingDays=$('.sectionSettings input[name="Closingdays"]').is(':checked');
            if(!statusRestaurantClosingDays)
            {
                errorMessage+=' Please select Restaurant Closing Days ;';
            }

            if(statusAutoAssign && restaurantOpenTimingsFlag && restaurantCloseTimingsFlag && statusRestaurantOpenDays && statusRestaurantClosingDays)
            {
                settingsErrorMessage.css("display","none").text("");
            }
            else
            {
                settingsErrorMessage.css("display","block").text(errorMessage);
            }
        }




        function validateDay(event)
        {

            var day=$('input[name="day"]').is(':checked');
            if(day)
            {
                console.log('day is checked');
                return true;
            }
            else
            {
                console.log('day is not checked');
                return false;
            }
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
            if(!(hours>=0 && hours<=23) || !(minutes>=0 && minutes<=59))
            {
                return false;
            }
            else
            {
               return true;
            }
        }

    });

})(jQuery)