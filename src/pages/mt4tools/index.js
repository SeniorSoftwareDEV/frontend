import './index.css'
import { useState } from 'react';
import { EyeOutlined, TableOutlined } from '@ant-design/icons';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FxTab from './FxTab';
import logo from 'assets/images/icons/tbLogo.png';
import { Link } from 'react-router-dom';


const MT4Tools = () => {
    const symbols = ['AUDCAD', 'AUDCHF', 'AUDJPY', 'AUDNZD', 'AUDUSD', 'CADCHF', 'CADJPY', 'CHFJPY', 'EURAUD', 'EURCAD', 'EURGBP', 'EURJPY', 'EURNZD', 'EURUSD', 'GPBAUD', 'GBPCAD', 'GBPCHF', 'GBPJPY', 'GBPNZD', 'GBPUSD', 'NZDCAD', 'NZDCHF', 'NZDJPY', 'NZDUSD', 'USDCAD', 'USDCHF', 'USDJPY']
    const symbol_cnts = [1, 0, 4, 0, 0, 0, 17, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 3, 0, 0]
    const elements = [];
    const summary_items = ['SUMMARY', 'DETAIL']
    const update_string = 'Data Last Updated: 5/2/2023 1:30 PM'

    const [item, setItem] = useState(summary_items[0]);
    const handleChange = (event) => {
      setItem(event.target.value);
    };

    for(let i=0; i < symbols.length/2; i++) {
        let i_2 = parseInt(symbols.length/2) + 1 + i
        elements.push(
            <div style={{display:'flex', justifyContent:'space-between', padding:'2px'}}>
              <div style={{width:'40%', display:'flex', justifyContent: 'space-between'}}><div>{symbols[i]}</div> {symbol_cnts[i]!==0?<div>{symbol_cnts[i]}</div>:null}</div>
              <div style={{width:'40%', display:'flex', justifyContent: 'space-between'}}><div>{symbols[i_2]}</div> {symbol_cnts[i_2]!==0?<div>{symbol_cnts[i_2]}</div>:null}</div>
            </div>
        );
    }

    return (
        <>
            <div className="main">
                <div className="left-side">
                    <div className='logo'>
                        <Link className='logo-img' to='/dashboard'><img src ={logo} alt='logo' style={{width: '100%'}}></img></Link>
                        <div className='logo-text'>
                            <div style={{fontSize: '20px'}}>Tradding Buddy</div>
                            <div>Fx MT DCA</div>
                        </div>
                    </div>
                    <div className='open-trades'>
                        <div style={{display:'flex', justifyContent:'space-between'}}>OPEN TRADES     <EyeOutlined /> </div>
                        <div style={{padding: '10px 0px'}}>SYMBOL / LEGS</div>
                        <div style={{fontSize: '12px', justifyContent:'space-between'}}>{elements}</div>
                    </div>
                    <div className='total-profit'>         
                    </div>
                </div>
                <div className='data-info'>
                    <div className='summary'>
                        <div>
                            <FormControl sx={{ minWidth: 140 }}>
                                <Select value={item} onChange={handleChange} sx={{ '& .MuiSelect-icon': { color: 'white' }, color: 'white', }}>
                                    {summary_items.map((item, index) => (
                                        <MenuItem value={item} key = {index}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{fontSize: '25px', cursor: 'pointer'}}><TableOutlined /></div>
                        <div>{update_string}</div>
                    </div>
                    <div className='graph'></div>
                    <div className='tab'>
                        <div><FxTab /></div>   
                    </div>
                </div>
            </div>
        </>
    );
}
export default MT4Tools