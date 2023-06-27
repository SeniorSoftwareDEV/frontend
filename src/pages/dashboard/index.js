/* eslint-disable*/
import React, { useState,useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// material-ui
import { Box, Button, Grid, Typography } from '@mui/material';

import MainCard from 'components/MainCard';
import DBSetting from 'assets/images/icons/dbsetting.svg';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import OpenFoler from 'assets/images/icons/openfolder.svg';
import DragDrop from 'assets/images/icons/dragdrop.svg';
import Laptop from 'assets/images/icons/laptop.svg';
import Match_Icon from 'assets/images/icons/match.svg';

import { useTheme } from '@mui/material/styles';
import { Divider } from '../../../node_modules/@mui/material/index';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [inputImg, setInputImg] = useState(require('assets/images/trading/input.png'))
  const [selectImg, setSelectImg] = useState(false)
  const [inputImgName, setInputImgName] = useState('AUDCAD-Mon-05-22-2023-11-4')
  const [outputImgName, setOutputImgName] = useState('AUDUSD-Mon-05-22-2023-11-4')
  const [accuracy, setAccuracy] = useState('85')
  const theme = useTheme();
  const outputImgRef = useRef(null);
  const inputImgRef = useRef(null);
  const fileInput = React.useRef();
  let outputImg = require('assets/images/trading/output.png')
  const Upload_Local = async (e) => {
    if(e.target.files[0]) {
      setInputImgName(e.target.files[0].name.slice(0,-4))
      let temp_url = await getBase64(e.target.files[0]);
      setInputImg(temp_url)
      setSelectImg(true)
    }
  }
  const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  const Match = async () => {
    if(selectImg === true) {
      const formData = new FormData();
      formData.append('inputImg', inputImg);
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/match`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        if (res.status === 200) {
            let img= res.data.img
            let accuracy = res.data.accuracy
            let fname = res.data.fname
            setAccuracy(accuracy)
            setOutputImgName(fname.slice(0,-4))
            outputImgRef.current.src = 'data:image/jpeg;base64,'+ img.slice(2, -1)
        }
      })
      .catch((err) => {
        toast.error("Server Error");
      });
    }
    else {
      toast.error("Please select original image")
    }
  }
  return (
    <Grid>
      <Grid sx={{ minWidth: 'fit-content' }}>
        <Grid container columnSpacing={2.75} alignItems="center" padding='20px'>
          <ImageSearchIcon
            sx={{
              height: theme.palette.success.ImageSearchIcon,
              width: theme.palette.success.ImageSearchIcon,
              bgcolor: '#ffffff',
              borderRadius: '15px'
            }}
          />
          <Grid item>
            <Typography variant="h3" color="white">
              IMAGE MATCHING
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container sx={{ minWidth: 'fit-content' }} display='flex' flexDirection = 'row' justifyContent = 'space-between'>
        
        <Grid item xs={12} md={3.5} lg={3.5}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" color="#aabbc6">
                Model
              </Typography>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5, bgcolor: 'transparent', minWidth: 'fit-content' }}>
            <Box sx={{ padding: '30px' }}>
              <Grid container rowSpacing={5} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={() => fileInput.current.click()}
                    sx={{
                      bgcolor: '#bdc1c6',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      minHeight: '115px',
                      minWidth: '240px',
                      borderRadius: '15px',
                      padding: '20px',
                      paddingLeft: '40px',
                      paddingRight: '40px',
                      color: '#4e658f'
                    }}
                  >
                    <img src={DBSetting} width="50px"></img>
                    Upload Modal Image
                  </Button>
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    sx={{
                      bgcolor: '#bdc1c6',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      minHeight: '115px',
                      minWidth: '240px',
                      borderRadius: '15px',
                      padding: '20px',
                      paddingLeft: '40px',
                      paddingRight: '40px',
                      color: '#4e658f'
                    }}
                  >
                    <img src={Laptop} width="50px"></img>
                    Train Model
                  </Button>
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    sx={{
                      bgcolor: '#bdc1c6',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      minHeight: '115px',
                      minWidth: '240px',
                      borderRadius: '15px',
                      padding: '20px',
                      paddingLeft: '40px',
                      paddingRight: '40px',
                      color: '#4e658f'
                    }}
                  >
                    <img src="" width="50px"></img>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </MainCard>
        </Grid>

        <Grid item xs={12} md={3.5} lg={3.5}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" color="#aabbc6">
                Input
              </Typography>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5, bgcolor: 'transparent', minWidth: 'fit-content' }}>
            <Box sx={{ padding: '30px' }}>
              <Grid container rowSpacing={5} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={() => fileInput.current.click()}
                    sx={{
                      bgcolor: '#bdc1c6',
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'left',
                      flexDirection: 'row',
                      minHeight: '115px',
                      minWidth: '240px',
                      borderRadius: '15px',
                      color: '#4e658f'
                    }}
                  >
                    <img src={OpenFoler} width="80px" style={{ marginRight: '10px' }}></img>
                    Choose image <br /> from local drive
                  </Button>
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    sx={{
                      bgcolor: '#bdc1c6',
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'left',
                      flexDirection: 'row',
                      minHeight: '115px',
                      minWidth: '240px',
                      borderRadius: '15px',
                      color: '#4e658f'
                    }}
                  >
                    <img src={DragDrop} width="80px" style={{ marginRight: '10px' }}></img>
                    Drag & Drop <br /> image here
                  </Button>
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    sx={{
                      bgcolor: '#bdc1c6',
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'left',
                      flexDirection: 'row',
                      minHeight: '115px',
                      minWidth: '240px',
                      borderRadius: '15px',
                      color: '#4e658f'
                    }}
                    onClick = {Match}
                  >
                  <img src={Match_Icon} width="80px" style={{ marginRight: '10px' }}></img>
                  Matching<br />
                  Image
                  </Button>
                </Grid>
                
              </Grid>
            </Box>
          </MainCard>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" color="#aabbc6">
                Matching Results
              </Typography>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5, bgcolor: 'transparent', minWidth: 'fit-content' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
              <div style={{ width: '100%', height: '485px' }}>
                <div style={{ width: '100%', height: '230px', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                  <div style={{ width: '80px', height: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <Typography variant="h5" color="#aabbc6" sx={{ writingMode: 'vertical-lr', transform: 'rotate(-180deg)' }}>
                      Original
                    </Typography>
                  </div>
                  <div style={{ width: '100%', height: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" color="#aabbc6" >
                      {inputImgName}
                    </Typography>
                    <img src={inputImg} width="100%" height = '80%' ref={inputImgRef}></img>
                  </div>
                </div>
                <div style={{ width: '100%', height: '230px', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                  <div style={{ width: '80px', height: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <Typography variant="h5" color="#aabbc6" sx={{ writingMode: 'vertical-lr', transform: 'rotate(-180deg)' }}>
                      Closest Match
                    </Typography>
                  </div>
                  <div style={{ width: '100%', height: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" color="#aabbc6">
                      {outputImgName}
                    </Typography>
                    <img src= {outputImg} width="100%" height = '80%' ref={outputImgRef}></img>
                  </div>
                </div>
              </div>
              <div style={{ width: '150px', height: '485px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography variant="h5" color="#aabbc6" sx={{ textAlign: 'center', paddingBottom: '20px' }}>
                  Confidence <br /> Level
                </Typography>
                <Divider sx={{ marginLeft: '35px', marginRight: '35px' }}></Divider>
                <Typography variant="h1" color="#22b14c" sx={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'60px'}}>
                  {accuracy}%
                </Typography>
                <Divider sx={{ marginLeft: '35px', marginRight: '35px', marginBottom: '60px' }}></Divider>
              </div>
            </Box>
          </MainCard>
        </Grid>
      </Grid>

      {/* <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" color="textSecondary">
          Model last updated: 5/22/2023 10:19am
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mt: '5px' }}>
          Data last updated: 2/21/2022 10:19am
        </Typography>
      </Grid> */}
      <input ref={fileInput} type="file" onChange={Upload_Local} style={{ display: 'none' }} />
    </Grid>
  );
};

export default DashboardDefault;
