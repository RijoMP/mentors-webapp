/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState,useEffect, useRef } from "react";

// react-router-dom components
import { Link,useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import InputAdornment from '@mui/material/InputAdornment';
import MuiPhoneNumber from 'material-ui-phone-number';
import { MuiOtpInput } from 'mui-one-time-password-input'


//cukstom style

import style from "./style.css";


// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { useUserAuth } from "context/UserAuthContext";



function Basic() {
  const navigate = useNavigate();
  

  // window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

  const [errorSB, setErrorSB] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpScreen,setOtpScreen] = useState(false)
  const { setUpRecaptha } = useUserAuth();
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false);




  useEffect(()=>{},[otpScreen])

  const [login, setLogin] = useState({
    email: localStorage.getItem('email') || "",
    token: localStorage.getItem('token') || "",
    password: "",
    lastLogin:localStorage.getItem('lastLogin') ||"",
    isLoggedIn: localStorage.getItem("isLoggedIn") || false
  });

  const handleCountryCodeChange = async(value)=>{
    if (value) {
       setPhone(value);
    }
    console.log(phone)
  }

  const handleLogin  = async(e) => {
    e.preventDefault();
    console.log(phone)
    if(!phone){
      setErrorMessage("Phone Number Required")
      setErrorSB(true)
    }
    else{
      try{
        const response = await setUpRecaptha(phone);
        if(response){
          phoneDisplay.current.className = "hidden"
          otpDisplay.current.className = ""
          setResult(response);
          setFlag(true);


        }
       
        //signInWithGoogle();
      }
      catch(err){
             setErrorMessage(err.message)
             setErrorSB(true)
            }
      //signInWithPhoneNumber
      
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === "" || otp === null || otp.length != 6) {
      setErrorMessage("OTP is not valid")
      setErrorSB(true)
      return;
    }
    try {
      await result.confirm(otp);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.message)
      setErrorSB(true)
    }
  };
  const handleOtp = async(newValue) => {
    setOtp(newValue)
    }
  
    const cancelOtp = () => {
      phoneDisplay.current.className = ""
      otpDisplay.current.className = "hidden"
      }  
  const matchIsNumeric = (text)=> {
      return text.match(/^[0-9]*$/)
    }
    
    const validateChar = (value, index) => {
      return matchIsNumeric(value)
    }
  const handleSetRememberMe = () => setRememberMe(!rememberMe);


  const Popup = (props)=>{
    return(<>
    <MDSnackbar
      color="error"
      icon="warning"
      title="Data Error!"
      content={props.message || "Phone number required "}
      dateTime=""
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgRed    />
    </>)
  }
  const phoneDisplay = useRef()
  const otpDisplay = useRef()


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography  variant="h5" fontWeight="medium" color="white" mt={1}>
            Welcome
          </MDTypography>
          <Grid item xs={12} sm={6} lg={3}>
                    <Popup message={errorMessage || ''}></Popup>
                  </Grid>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox  pt={4} pb={3} px={3} ref={phoneDisplay}>
          <MDBox component="form" role="form">
          <MDBox mt={4} mb={1} textAlign="center">

          <MuiPhoneNumber label="Phone Number*" defaultCountry={'in'} variant="outlined" value = {phone}  size="string" countryCodeEditable="false"onChange = {handleCountryCodeChange}/>
          
         
          </MDBox>

            {/* <MDBox mb={2}>
              <MDInput type="email" required label="Email" fullWidth value={email} onChange = {e=>setEmail(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" required label="Password" fullWidth  onChange = {e=>setPassword(e.target.value)} />
            </MDBox> */}
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1} textAlign="center">
              <MDButton variant="gradient" color="info"  onClick={handleLogin}>
                send otp
              </MDButton>
              <MDBox mt={4} mb={1} textAlign="center" id="captcha">
          <div id="recaptcha-container"></div>

          </MDBox>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox className="hidden" pt={4} pb={3} px={10} ref={otpDisplay}>
          <MDBox component="form" role="form">
          <MDBox mt={4} mb={1}  pt={4} pb={3} px={1} textAlign="center">
          <MuiOtpInput mx={2.5} length="6" value={otp} onChange={handleOtp}  validateChar={validateChar}/>
          </MDBox>

            {/* <MDBox mb={2}>
              <MDInput type="email" required label="Email" fullWidth value={email} onChange = {e=>setEmail(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" required label="Password" fullWidth  onChange = {e=>setPassword(e.target.value)} />
            </MDBox> */}
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1} textAlign="center">
              <MDButton variant="gradient" color="error"  onClick={cancelOtp}>
                Cancel
              </MDButton>
              &nbsp;&nbsp;
              <MDButton variant="gradient" color="info"  onClick={verifyOtp}>
                verify
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
