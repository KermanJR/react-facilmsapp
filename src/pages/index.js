import {
  Typography, 
  Box, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Input,
  TextField
} from '@mui/material';
import styles from './style/style.module.css';
import { BiSearch, BiBarcodeReader } from 'react-icons/bi'
import { useEffect, useState } from 'react';
import GansoService from '../api/API';



 export default function MyApp(){

    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [modalSearchValue, setModalSearchValue] = useState(''); 
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
   const [activef2, setActiveF2] = useState(false);

   

    const openResultModal = () => {
      setOpenModal(true);
    }
  
    const closeResultModal = () => {
      setOpenModal(false);
      setActiveF2(false)

    }

 
    const handleInputChange = (event) => {
      const { value } = event.target;
      setIsLoading(true)
      setInputValue(value);
      //setData([])
      setIsLoading(false)
      let filteredProducts = applyFilter(value);

      if (filteredProducts.length > 0) {
        setData(filteredProducts);
      } else {
        setData(data); 
      }
    };

    const applyFilter = (value) => {
 
      const lowerSearchValue = value.toLowerCase();
      //setData(filteredProducts);
      return data.filter((product) => {
        return (
          product.CODIGO.toString().includes(lowerSearchValue) ||
          product.CODIGO_BARRA.toString().includes(lowerSearchValue) ||
          product.DESCRICAO.toLowerCase().includes(lowerSearchValue) ||
          product.ESTOQUE.toString().includes(lowerSearchValue) ||
          (product.PRECO_VENDA &&
            product.PRECO_VENDA.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).includes(lowerSearchValue))
        );
      });
    
      
    };

    useEffect(() => {
      const handleKeyPress = (event) => {
        console.log(event)
        if (event.keyCode === 113) {
          openResultModal();
          setInputValue('')
          setData([])
          setActiveF2(true)
        }
      };
  
      window.addEventListener('keydown', handleKeyPress);
  
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, []);
  


    function GetProductById(e){
      if(inputValue != null && inputValue != ''){
        e.preventDefault();
        setInputValue(inputValue)
        setActiveF2(false)

        GansoService.GetProductById(inputValue)
        .then(res=>{
          setData(res);
          openResultModal();
        }).catch(err=>{
          setError('Código de barra inválido');
        })
      }
    }

    function getProductBySearch(e){
      if(inputValue != null && inputValue != ''){
        e.preventDefault();
        GansoService.getProductBySearch(inputValue)
        .then(res=>{
          setData(res);
          openResultModal();
          setInputValue('')

        }).catch(err=>{
          setError('Código de barra inválido');
        })
      }
    }


    const handleKeyPress = (e) => {
      if (e.key === 'Enter'  && inputValue != null && inputValue != '' && !activef2) {
          GansoService.GetProductById(inputValue)
          .then(res=>{
            setData(res);
            openResultModal()
          }).catch(err=>{
            setError('Código de barra inválido')
          })
      }else if (e.key === 'Enter'  && activef2){
        GansoService.getProductBySearch(inputValue)
          .then(res=>{
            setData(res);
            openResultModal()
            setInputValue('')
          }).catch(err=>{
            setError('Código de barra inválido')
          })
      }
    };

    
      useEffect(() => {
        const clearMessages = () => {
          setTimeout(() => {
            setError(null);
          }, 3000);
        };
        if (error) {
          clearMessages();
        }
      }, [error]);

    
    return(
        <Box className={styles.container}>
            <Dialog open={openModal} onClose={closeResultModal} maxWidth="lg" fullWidth>
        <DialogTitle style={{ color: '#F26422' }}>Consulta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isLoading ? (
              <Typography style={{ textAlign: 'center', marginTop: '1rem' }}>Carregando...</Typography>
            ) : (
              <>
              <Box style={{display: 'flex', flexDirection: 'row', gap: '.5rem', alignItems: 'center', justifyContent: 'center'}}>
                <TextField
                  label="Pesquisar"
                  focused={true}
                  InputProps={{ selectAllOnFocus: true }}
                  style={{
                    marginTop: '.5rem',
                    width: activef2? '90%': '100%',
                  }}
                  variant="outlined"
                  onKeyPress={handleKeyPress}
                  autoFocus={true}
                  onChange={(e) => handleInputChange(e)}
                />
                  <Box>
                    {
                      activef2 ? 
                      <Button onClick={getProductBySearch} variant='contained' style={{padding: '1.3rem', marginTop: '7px'}} ><BiSearch/></Button>
                      :
                      ''
                    }
                  
                  </Box>
                </Box>
                {data.length === 0 ? (
                  <Typography style={{ textAlign: 'center', marginTop: '1rem' }}>Nenhum produto encontrado</Typography>
                ) : (
                  <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Código</TableCell>
                          <TableCell>Código de Barras</TableCell>
                          <TableCell>Descrição</TableCell>
                          <TableCell>Preço</TableCell>
                          <TableCell>Estoque</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item?.CODIGO}</TableCell>
                            <TableCell>{item?.CODIGO_BARRA}</TableCell>
                            <TableCell>{item?.DESCRICAO}</TableCell>
                            <TableCell>
                              {item?.PRECO_VENDA ? (item?.PRECO_VENDA).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 0}
                            </TableCell>
                            <TableCell>{item?.ESTOQUE}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeResultModal} color="primary" variant="contained">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <Box className={styles.form} typography="form">
        <Box>
        <h3 
          style={{
            color:'#F26422',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginTop: '5rem'
          }}
        >Fácil Automação
        </h3>
        <p style={{fontSize: '.875rem'}}>Realize a sua consulta abaixo:</p>
      </Box>
      <Box style={{
        marginTop: '2rem', 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '1rem', 
        justifyContent: 'center', 
        width: '100%'
        }}
      >
        <Box style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem', 
          justifyContent: 'center', 
          width: '100%'
        }}>
          <Box>
            <Box>
            <TextField
                type="text"
                required={true}
                onChange={(e) => handleInputChange(e)}
                autoFocus={true}
                placeholder="Código de barras"
                onKeyPress={handleKeyPress} 
                InputProps={{ selectAllOnFocus: true }}
                value={inputValue}
                style={{
                  width: '70%',
                  borderRadius: '8px',
                  height: '20px'
                }}
                focused={true}
          
              />
               <Button onClick={GetProductById} variant='contained' style={{
                height: '55px',
                padding: '1rem',
                marginLeft: '1rem'

               }}><BiBarcodeReader size={20}/></Button>
                <p color="red" style={{
                  textAlign: 'left',
                  fontSize: '.7rem',
                  color: 'red',
                  width: '85%',
                  margin: '.7rem auto',
                  height: '20px'
                }}>{error}</p>
            </Box>
            </Box>
          </Box>
        </Box>

        
        </Box>

        <Typography 
          typography="p" 
          style={{
            fontSize:'.6rem',
            marginTop: '.5rem'
          }}
        >
          Copyright © 2023 Fácil Automação Comercial. Todos os direitos reservados.
        </Typography>
      </Box>
    )
 }