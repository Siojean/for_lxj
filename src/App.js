import React from 'react';
import './App.css';
import loadPages from './pages/loadPage'
import { Popover,message,Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';

const appMenu=[
    {
        title:'excel文件预览table',
        key:'ExcelToTable',
        src:'src\\pages\\ExcelToTable.js'
    }
]
class App extends React.Component<>{
    constructor(props) {
        super(props);
        this.state={
            page:'ExcelToTable',
        }
    }


    menuClick=(key)=>{
        this.setState({
                page:key,
            }
        )
    }
    copy=(value)=>{
        let transfer = document.createElement('input');
        document.body.appendChild(transfer);
        transfer.value = value;
        transfer.focus();
        transfer.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
        }
        transfer.blur();
        document.body.removeChild(transfer);
        message.success('复制成功');
    }

    render() {
        const {page}=this.state
        let RenderPage=loadPages[page]



        return (
            <div style={{padding:'10px'}}>
                <div style={{display:'flex',minHeight:'100px'}}>
                    {appMenu.map((item,index)=>{
                        const content=(
                            <div >
                                <span>{item.src}</span>
                                <a onClick={(e)=>{this.copy(item.src)}}><CopyOutlined /></a>
                            </div>
                            )
                        return (
                            <Popover content={content}  title={'代码文件路径'}>
                                <Button type={'link'}  onClick={(e)=>this.menuClick(item.key)} >{item.title}</Button>
                            </Popover>
                        )
                    })}
                </div>

                <RenderPage/>
            </div>
        )
    }


}

export default App;
