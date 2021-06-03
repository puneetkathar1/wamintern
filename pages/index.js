import React, { useRef } from 'react';
import { render } from 'react-dom'
import EmailEditor from 'react-email-editor';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import template3 from './template.json'
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import Link from 'next/link'


const Index = () => {


  const [data2, setData2] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [template2, setTemplate2] = React.useState(template3);
  React.useEffect(function() {
    if(localStorage.getItem('template') !== undefined && localStorage.getItem('template') !== null){
      // setTemplate2(localStorage.getItem('template'))
    } 
   
},[]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const handleClose = () => {
    setOpen(false);
  };

    const emailEditorRef = useRef(null);
    const [data, setData] = React.useState()

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      console.log('exportHtml', html);
      setData(html)
      setOpen(true);

    });
  };


 
  const saveDesign = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design} = data;
      console.log(design)
      axios.post('https://api2-puneet.herokuapp.com/savedesign', {
        design: design

      })
      .then(function (response) {
        console.log(response.data);
        setData2(JSON.stringify(response.data))
      })

    });
  };

  React.useEffect(()=>{

      localStorage.setItem('template', data2)

  },[data2, setData2])
 

  const loadDB = () => {
    axios.get('https://api2-puneet.herokuapp.com/getdesign')
    .then(function (response) {
      
     console.log(response.data)
    })

  };
      

  const onDesignLoad = (data) => {
    console.log('onDesignLoad', data);
  };

  
  const onLoad = () => {

    emailEditorRef.current.editor.addEventListener(
      'onDesignLoad',
      onDesignLoad
    );
     emailEditorRef.current.editor.loadDesign(template2);
  };
  


return (
<div>

      
      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        style={{height: '100vh', width:'100vh'}}
      />

<div style={{textAlign: 'center', height: '30vh'}} >
        <button style={{fontSize: '18px', width: '20rem', height: '5rem', borderRadius: '20px', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '10rem', marginRight: '2rem'}} onClick={exportHtml}>Copy HTML</button>
        <button style={{fontSize: '18px', width: '20rem', height: '5rem', borderRadius: '20px', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '10rem', marginLeft: '2rem'}} onClick={saveDesign} >Save Design in DB</button>
        <button style={{fontSize: '18px', width: '20rem', height: '5rem', borderRadius: '20px', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '10rem', marginLeft: '2rem'}} onClick={loadDB} >Load Design from DB</button>

      </div>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Here is your HTML code"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {data}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
            Close
          </Button>
          <Button autoFocus onClick={() => {navigator.clipboard.writeText(data)}} >
            Copy to Clipboard
          </Button>

        </DialogActions>
      </Dialog>
</div>
)

}

export default Index
