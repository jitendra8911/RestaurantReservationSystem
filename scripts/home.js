/**
 * Created by Jitendra Malakalapalli on 7/25/2015.
 */
(function($)
{

    $(document).ready(function(){





        /* start of login validations*/

        $('div.login input[name="Login"]').on('click',function () {validateLoginFields(event)});
        $('div.login input[name="Username"]').change(function() {validateUserName(event)});
        $('div.login input[name="Password"]').change(function() {validatePassword(event)});
        function validateUserName(event)
        {
            var username=$('div.login input[name="Username"]');
            var usernameErrorMessage=$('#Username + .error-msg');
            if(username.val()==='')
            {
                usernameErrorMessage.css("display","block").text("Please enter Username");
                return false;
            }
            else
            {
                usernameErrorMessage.css("display","none").text("");
                return true;
            }
        }

        function validatePassword(event)
        {
            var password=$('div.login input[name="Password"]');
            var passwordErrorMessage=$('#Password + .error-msg');
            if(password.val()==='')
            {
                passwordErrorMessage.css("display","block").text("Please enter Password");
                return false;
            }
            else
            {
                passwordErrorMessage.css("display","none").text("");
                return true;
            }
        }

        function validateLoginFields(event)
        {

            var usernameFlag=validateUserName(event);
            var passwordFlag=validatePassword(event);
            /* if(usernameFlag && passwordFlag)
             {
             console.log("true");
             }
             else
             {
             console.log("false");
             }
             */

        }


        /* end of login validations */






    });


})(jQuery);