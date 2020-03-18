import React, { Component } from 'react';
import './ChannelListPage.css';
import { Modal, Button,Spin,message,Icon } from 'antd';
import ChannelService from './ChannelService'
import PageTitleBar from '../../components/PageTitleBar/PageTitleBar';
import ChannelAdd from './ChannelAdd';
import ChannelEdit from './ChannelEdit';

const ButtonGroup = Button.Group;

function TheErrorView(props){
  var err = props.err?""+props.err:"";
  return ( <h3>{err}</h3>);
}

function TheEmptyView(){
  return (<div>暂无数据</div>)
}

function TheListView(props) {
  const dataList = props.dataList;
  const onClick_move = props.onClick_move;
  if(!dataList || dataList.length===0){
    return (<TheEmptyView/>)
  }
  let { onClick_edit } = props;
  const allItems = dataList.map((item,index)=>{
          let { channelID,channelName,channelNameChinese,channelIcon } = item;
          let { rankNumber,queryKey,enable,createdDate } = item;
          return (
              <tr key={index}>
                <td className='text-center'>{rankNumber}</td>
                <td>{channelName}</td>
                <td>{channelNameChinese}</td>
                <td><img className='channelImg' src={channelIcon}/></td>
                <td>{queryKey}</td>
                <td className='text-center'>{enable?"启用":"禁用"}</td>
                <td>{channelID}</td>
                <td>{createdDate}</td>
                <td>
                  <ButtonGroup>
                    <Button icon="edit" onClick={onClick_edit.bind(this,channelID)}/>
                    <Button shape="circle" icon="arrow-up"  onClick={onClick_move.bind(this,channelID,'up')}/>
                    <Button shape="circle" icon="arrow-down"  onClick={onClick_move.bind(this,channelID,'down')}/>
                  </ButtonGroup>
                </td>
              </tr>
          )
      })
    return (
      <table className="table1">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Name Chinese</th>
                <th>Icon</th>
                <th>QueryKey</th>
                <th>Enable</th>
                <th>ID</th>
                <th>CreatedDate</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>{allItems}</tbody>
      </table>
  );
}

class ChannelListPage extends Component {
  state = {
    "dialog_Add_visible": false,
    "dialog_edit_visible": false,
    "channelID_for_edit":0,
    "confirmLoading4DialogUserAdd": false,
    "theListKey":'0'
  }

  constructor(props) {
    super(props);

    this.state = {
      dataList:[],
      isLoaded:true,
      error:''
    }
  }

  handleOnClick_edit=(channelID)=>{
    console.log("ChannelList handleOnClick_edit channelID="+channelID);
    this.showDialog_Edit(channelID);
  }

  showDialog_Add = () => {
    this.setState({
      dialog_Add_visible: true,
    });
  }

  closeDialog_Add = () => {
    this.setState({
      dialog_Add_visible: false,
    });
  }

  showDialog_Edit = (channelID) => {
    console.log("ChannelList showDialog_Edit channelID="+channelID);
    this.setState({
      dialog_edit_visible: true,
      channelID_for_edit:channelID
    });
  }

  closeDialog_Edit = () => {
    console.log("##### closeDialog_Edit");
    this.setState({
      dialog_edit_visible: false,
      channelID_for_edit: 0
    });
  }

  //关联到子组件，关联后，可直接操作子组件
  onReceiveChildMessage_add = (childMessage)=>{
    if(childMessage === 'msg_add_cancel'){
      this.closeDialog_Add();
    } else if(childMessage === 'msg_add_success'){
      this.closeDialog_Add();
      this.getAllUserList();
    }
  }

  //关联到子组件，关联后，可直接操作子组件
  onReceiveChildMessage_edit = (childMessage)=>{
    if(childMessage === 'msg_edit_cancel'){
      this.closeDialog_Edit();
    } else if(childMessage === 'msg_edit_success'){
      this.closeDialog_Edit();
      this.getAllUserList();
    }
  }

  componentDidMount() {
    this.getAllUserList();
  }

  handleClickMove(channelID,direction){
    let that = this;
    ChannelService.moveRank(channelID,direction)
      .then((req) => {
        let { data:res } = req;
        const { code } = res;
        if(!res){
          message.error(''+res.message);
          return;
        }
        if(code !== 200){
          message.error(''+res.message);
          return;
        }
        that.getAllUserList();//刷新页面
      })
      .catch((error)=> {
        message.error(''+error.message);
      });
  }

  getAllUserList = ()=>{
    let { app_name } = this.props;
    ChannelService.getAll(app_name)
      .then((req) => {
        let { data:res } = req;
        if(!res){
          message.error(''+res.message);
          return;
        }
        const { data:dataList,code } = res;
        if(code !== 200){
          message.error(''+res.message);
          return;
        }
        console.log("dataList = ");
        console.log(dataList);
        this.setState({
          dataList:dataList,
          isLoaded:true,
          error:''
        });
      })
      .catch((error)=> {
        message.error(''+error.message);
        this.setState({
          dataList:[],
          isLoaded:false,
          error:error
        })
      });
  }

  render() {
    console.log("ChannelList render");
    let { app_name } = this.props;

    return (
      <div className="project_container">
        <PageTitleBar t_title="Channel List"/>
        <div className="menu_bar">
            <Button className="button1" type="primary"  icon="plus" onClick={this.showDialog_Add}>
              New Channel
            </Button>
        </div>
        <div className="channel_pannel">
          <TheListView dataList={this.state.dataList}
              onClick_edit= {this.handleOnClick_edit.bind(this)}
              onClick_move={this.handleClickMove.bind(this)}>
          </TheListView>
          <TheErrorView err={this.state.error}/>
        </div>
        <ChannelAdd
            app_name={ app_name }
            t_visable={this.state.dialog_Add_visible}
            t_onChildMessage={this.onReceiveChildMessage_add.bind(this)}>
        </ChannelAdd>
        <ChannelEdit
            t_visable={this.state.dialog_edit_visible}
            t_onChildMessage={this.onReceiveChildMessage_edit.bind(this)}
            t_channelID={this.state.channelID_for_edit}>
        </ChannelEdit>
      </div>
    );
  }
}

export default ChannelListPage;
