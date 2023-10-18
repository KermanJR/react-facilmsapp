import { Box, Input, Button, Typography, Ima} from '@mui/material';
import styles from './style/style.module.css';
import { BiSearch, BiBarcodeReader } from 'react-icons/bi'
import Select from 'react-select';
import { useRef, useEffect } from 'react';
 export default function MyApp(){

    const options = [
        { value: 'produto1', label: 'Produto 1' },
        { value: 'produto2', label: 'Produto 2' },
        { value: 'produto3', label: 'Produto 3' }
      ]

      const customStyles = {
        control: (base, state) => ({
          ...base,
          border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
          boxShadow: state.isFocused ? 0 : 0,
          borderRadius: '6px',
          backgroundColor: '#ebebeb',
          fontSize: '.8rem',
          textAlign: 'left',
        }),
      };

     const  handleOpenCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          const videoElement = document.createElement('video');
          videoElement.srcObject = stream;
          videoElement.autoplay = true;
          document.body.appendChild(videoElement);
        } catch (error) {
          console.error('Erro ao acessar a câmera:', error);
        }
      };

      let refSelect = useRef(null);

      const handleF12KeyPress = (e) => {
        if (e.key === 'F12') {
          e.preventDefault(); 
          if (refSelect.current) {
            refSelect.current.focus();
          }
        }
      };
    

      useEffect(() => {
        window.addEventListener('keydown', handleF12KeyPress);
        return () => {
          window.removeEventListener('keydown', handleF12KeyPress);
        };
      }, []);
      

    return(
        <Box className={styles.container}>
            <Box className={styles.form} typography="form">
                <Box style={{
                    borderBottom: '1px solid #ccc',
                    width: '100%'
                }}></Box>
                <Box>
                    <h3 style={{
                        color:'#F26422',
                        fontSize: '2rem',
                        fontWeight: '900',
                        marginTop: '1rem'
                    }}>Fácil Automação </h3>
                    <p style={{fontSize: '.875rem'}}>Realize a sua consulta abaixo:</p>
                </Box>

               <Box style={{marginTop: '3rem', display: 'flex', flexDirection: 'row', gap
            : '1rem', justifyContent: 'center', width: '100%'}}>
                    <input type='text' placeholder='Códido de barras' style={{
                        width: '100%',
                        backgroundColor: '#ebebeb',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        padding: '1rem',
                        height: '20px'
                    }}/>
                    <Button variant='contained' style={{textTransform: 'capitalize'}}><BiBarcodeReader/></Button>
               </Box>
               <Box style={{marginTop: '2rem', display: 'flex', flexDirection: 'row', gap
            : '1rem', justifyContent: 'center', width: '100%'}}>
                    <Select  options={options} placeholder="Nome do produto" styles={customStyles} ref={refSelect} className="react-select-container"/>
                    <Button variant='contained' style={{textTransform: 'capitalize'}} onClick={handleOpenCamera}><BiSearch/></Button>
               </Box>
            </Box>
            <Typography typography="p" style={{
                fontSize:'.6rem',
                marginTop: '.5rem'
            }}>Copyright © 2023 Fácil Automação Comercial. Todos os direitos reservados.</Typography>
        </Box>
    )
 }