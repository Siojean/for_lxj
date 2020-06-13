import React from 'react';
import XLSX from 'xlsx';
import { Table,Tabs,message } from 'antd';

const { TabPane } = Tabs;
class App extends React.Component<>{
    constructor(props) {
        super(props);
        this.state={
            lastData:[]
        }
    }

    click=()=>{
        let file =this.fileInput.files[0]
        //限制这段可以不用，根据你自己的判断
        let reg = /^.*\.(?:xls|xlsx|csv)$/i;
        if(file===undefined) {
            message.warn('请上传文件')
            return;
        }
        if(!reg.test(file.name)){
            message.warn('excel只允许预览excel文件')
            return;
        }
        console.log(file);


        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload =(evt)=> {
            try {
                // 以二进制流方式读取得到整份excel表格对象
                const workbook = XLSX.read(evt.target.result, { type: 'binary'});
                const result =  workbook.SheetNames.map((sheetName) => {
                    //解析excel数据整理成table格式
                    let sheet=XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
                    let columns=[];
                    for(let key in sheet[0]){
                        columns.push({
                            title: key,
                            dataIndex: key,
                            key,
                        })
                    }
                    return { tabsName:sheetName, columns,  dataSource:sheet }
                })
                this.setState({
                    lastData:result
                })
            } catch(e) {
                this.setState({
                    lastData: []
                })
                alert(`文件类型不正确:${e}`);
                return;
            }
        }
    }

    render() {
       const {lastData}=this.state
        return (
            <div>
                <input
                    id={'files'}
                    ref={(input)=>{this.fileInput = input}}
                    type={'file'}/>
                    <button onClick={this.click}>预览</button>
                <Tabs >
                    {lastData.map((item)=>
                        (
                            <TabPane tab={item.tabsName} key={item.tabsName}>
                                <Table columns={item.columns} dataSource={item.dataSource} />
                            </TabPane>
                        )
                    )}
                </Tabs>

            </div>
        )
    }


}

export default App;
