import React, { Component } from 'react';
import './ChannelEdit.css';
// import PageTitleBar from '../../components/PageTitleBar/PageTitleBar.js';
import { Form,  Input ,Radio, Switch, Upload, Icon} from 'antd';
import ChannelService from './ChannelService';
import { Modal, Button,Spin,message } from 'antd';
import HTTP from '../../common/HttpUtil'

const { confirm } = Modal;
var UPLOAD_URL = HTTP.getHostURL("/upload");
var ACCEPT_FILE_TYPE = ".jpg,.png,.jpeg";

function IconVisable(props){
  let { t_visable } = props;
  if(t_visable == undefined){
    t_visable = true;
  }
  if(t_visable){
    return (
      <img className='img_prv' src={props.src}/>
    );
  }else{
    return null;
  }
}

class ChannelEditForm extends Component {
    state = {
      "t_channelID": 0,
      "isShowOldIcon":true
    }

   constructor(props){
     super(props);
     console.log('ChannelEdit ChannelEditForm constructor');

     console.log('ChannelEdit-ChannelEditForm props.t_channelID='+props.t_channelID);

     this.state = {
       "t_channelID": props.t_channelID,
     }
     this.loadChannelInfo();
   }

  componentWillReceiveProps(nextProps) {
    console.log('ChannelEdit ChannelEditForm componentWillReceiveProps t_channelID='+nextProps.t_channelID);
    this.setState({
      t_channelID:nextProps.t_channelID
    });
   }

   hideOldChannelIcon(){
     this.setState({
       isShowOldIcon:false
     });
   }

   loadChannelInfo(){
     let { t_channelID:channelID } = this.state;
     console.log('ChannelEdit loadChannelInfo channelID ='+channelID);
     ChannelService.getChannel(channelID).then((response)=>{
         let { data } = response;
         if(data.code === 200){
           let {
             channelID,channelName,channelNameChinese,
             queryKey,enable,channelIcon
           } = data.data;

           this.setState({
             channelID,
             channelName,
             channelNameChinese,
             queryKey,
             enable,
             channelIcon
           });
         }else{
           message.error(data.message);
         }
     }).catch((err)=>{
         message.error(err.message);
       }
     );
   }

  componentDidMount() {
    console.log('ChannelEdit ChannelEditForm componentDidMount');
    // this.props.onLinkMe(this);
  }

  clearField(){
    this.props.form.resetFields();
  }

  // 主动触发提交
  raiseSubmit(callback){
    console.log('ChannelEdit handleSubmit');
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let bean = {...values};
      let { t_channelID } = this.state;
      if(!t_channelID){
        callback && callback(new Error("缺少 t_channelID"));
      }
      bean.channelID = t_channelID;
      console.log('Received values of form: ', JSON.stringify(bean));
      ChannelService.editChannel(bean).then((response)=>{
          let { data } = response;
          if(data.code === 200){
            message.success("修改成功");
            callback(undefined,"success");
            return;
          }
          callback(new Error(data.message));
      }).catch((err)=>{
          callback(err);
        }
      );

    });
  }

  // 文件上传相关
  normFile = e => {
    if(e.file.status==="done"){
      let res = e.file.response;
      if(res && res.code == 200){
        var dataStr = JSON.stringify(res.data);
        console.log(dataStr);
        this.hideOldChannelIcon();
        return dataStr;
      }else{
        message.error(res.messsage);
        return e && e.fileList;
      }
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
         labelCol: {
           xs: { span: 24 },
           sm: { span: 8 },
         },
         wrapperCol: {
           xs: { span: 24 },
           sm: { span: 16 },
         },
       };
    let { channelID,channelName,channelNameChinese,
      queryKey,enable,channelIcon } = this.state;

    return (
      <Form ref="form1" className="login-form">
            <Form.Item  {...formItemLayout} label="Channel Name：">
              {channelName}
            </Form.Item>
            <Form.Item  {...formItemLayout} label="中文名">
                  {getFieldDecorator('channelNameChinese', {
                    initialValue: channelNameChinese,
                    rules: [{ required: true, message: '请输入 channelNameChinese!' }],
                  })(
                    <Input placeholder="channel Name Chinese" />
                  )}
            </Form.Item>
            <Form.Item   {...formItemLayout}  label="图标：" extra="">
              <IconVisable
                t_visable={this.state.isShowOldIcon}
                src={channelIcon} ></IconVisable>
              {getFieldDecorator('channelIcon', {
                  rules: [{ required: false, message: '请上传 channelIcon!' }],
                valuePropName: 'file',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="file" accept={ACCEPT_FILE_TYPE} action={UPLOAD_URL}
                  onChange={this.handleUploadChange} listType="picture" data={{"fileType":"ChannelIcon"}}>
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>,
              )}
            </Form.Item>
            <Form.Item  {...formItemLayout} label="Query Key：">
                  {getFieldDecorator('queryKey', {
                    initialValue: queryKey,
                    rules: [{ required: true, message: '请输入 queryKey!' }],
                  })(
                    <Input placeholder="query Key" />
                  )}
            </Form.Item>
            <Form.Item  {...formItemLayout} label="是否启用">
               {getFieldDecorator('isEnable', {initialValue: enable, valuePropName: 'checked' })(
                 <Switch />
               )}
            </Form.Item>
          </Form>
    );
  }
}


// 包装在 dialog中
class WrapDialog extends Component {
  state = {
    "isLoading": false,
    "isShowing": false,
    "t_channelID": 0,
  }

   constructor(props){
     super(props);
     this.onChildMessageCallback = this.props.t_onChildMessage;
     this.doDelete = this.doDelete.bind(this);
   }

   componentWillReceiveProps(nextProps) {
     console.log("ChannelEdit WrapDialog nextProps.t_channelID="+nextProps.t_channelID);
    this.setState({
      isShowing: nextProps.t_visable,
      t_channelID:nextProps.t_channelID
    });
   }

   handleButtonOk= (e) => {
     this.formRef.raiseSubmit((err,result)=>{
       if(err){
         message.error(err.message);
         console.log("ERR:"+err.message);
         return;
       }
       this.onChildMessageCallback("msg_edit_success");
     });
   }

   //添加用户信息 对话的 cance 按钮点击事件
   handleCancelDialog = (e) => {
     this.onChildMessageCallback("msg_edit_cancel");
     this.closeDialog();
   }

   closeDialog(){
     this.setState({ isShowing: false });
   }

   saveFormRef = (formRef) =>{
     console.log("ChannelEdit saveFormRef="+formRef);
     this.formRef = formRef;
   }

   doDelete(){
     let channelID = this.state.t_channelID;
     if(!channelID || channelID === 0){
       message.error("缺少 channelID");
       return;
     }
     ChannelService.deleteChannel(channelID).then((response)=>{
         let { data } = response;
         if(data.code === 200){
           message.success("删除成功");
           this.onChildMessageCallback("msg_edit_success");
           this.closeDialog();
           return;
         }
         message.error(data.message);
     }).catch((err)=>{
         message.error(err.message);
       }
     );
   }

   showDeleteConfirm = ()=> {
     let it = this;
      confirm({
        title: 'Are you sure delete this ?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          it.doDelete();
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }

   render() {
     console.log("ChannelEdit render WrapDialog t_visable="+this.props.t_visable);

     const dialogSetting={
       title:"Eidt channel",
       cancelText:"取消",
       okText:"确定",
       confirmLoading:this.state.isLoading,
       destroyOnClose:true,
       maskClosable:false
     }

     const WrappedNormalForm = Form.create()(ChannelEditForm);
     return(
       <Modal
           {...dialogSetting}
         visible={this.state.isShowing}
         onOk={this.handleButtonOk}
         onCancel={this.handleCancelDialog}>
         <WrappedNormalForm wrappedComponentRef={this.saveFormRef}
          t_channelID={this.state.t_channelID}>
         </WrappedNormalForm>

         <div className="channel_more_action">
           <hr/>
           <h3>更多操作</h3>
           <Button type="danger" onClick={this.showDeleteConfirm.bind(this)}>删除这个 Channel</Button>
           <span className="danger">注意：删除后无法恢复，请谨慎操作。</span>
         </div>
       </Modal>
     );
   }
}

export default WrapDialog;
