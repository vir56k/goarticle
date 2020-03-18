import React, { Component } from 'react';
import './ChannelAdd.css';
// import PageTitleBar from '../../components/PageTitleBar/PageTitleBar.js';
import { Form,  Input ,Radio, Switch, Upload, Icon} from 'antd';
import ChannelService from './ChannelService';
import { Modal, Button,Spin,message } from 'antd';
import HTTP from '../../common/HttpUtil'

var UPLOAD_URL = HTTP.getHostURL("/upload");
var ACCEPT_FILE_TYPE = ".jpg,.png,.jpeg";

class ChannelAddForm extends Component {
   constructor(props){
     super(props);
     console.log('ChannelAdd AccountAddForm constructor');
     this.state = {
       platformValue:"fds"
     }
   }

  componentDidMount() {
    console.log('ChannelAdd AccountAddForm componentDidMount');
    // this.props.onLinkMe(this);
  }

  clearField(){
    this.props.form.resetFields();
  }

  // 主动触发提交
  raiseSubmit(callback){
    console.log('handleSubmit');
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let bean = {...values};
      // set appName
      bean.appName = this.props.app_name;
      console.log('Received values of form: ', JSON.stringify(bean));
      ChannelService.addChannel(bean).then((response)=>{
          let { data } = response;
          if(data.code === 200){
            message.success("添加成功");
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
        return dataStr;
      }else{
        message.error("ERR:5"+res.messsage);
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
    return (
      <Form ref="form1" className="login-form">
          <Form.Item  {...formItemLayout} label="Channel Name：">
              {getFieldDecorator('channelName', {
                rules: [{ required: true, message: '请输入 channelName!' }],
              })(
                <Input placeholder="channel Name" />
              )}
            </Form.Item>
            <Form.Item  {...formItemLayout} label="中文名">
                  {getFieldDecorator('channelNameChinese', {
                    rules: [{ required: true, message: '请输入 channelNameChinese!' }],
                  })(
                    <Input placeholder="channel Name Chinese" />
                  )}
            </Form.Item>
            <Form.Item   {...formItemLayout}  label="图标：" extra="">
              {getFieldDecorator('channelIcon', {
                  rules: [{ required: true, message: '请输入 channelIcon!' }],
                valuePropName: 'file',
                getValueFromEvent: this.normFile,
              })(
                <Upload className="upload1" name="file" accept={ACCEPT_FILE_TYPE} action={UPLOAD_URL}
                  onChange={this.handleUploadChange} listType="picture" data={{"fileType":"ChannelIcon"}}>
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>,
              )}
            </Form.Item>
            <Form.Item  {...formItemLayout} label="Query Key：">
                  {getFieldDecorator('queryKey', {
                    rules: [{ required: true, message: '请输入 queryKey!' }],
                  })(
                    <Input placeholder="query Key" />
                  )}
            </Form.Item>
            <Form.Item  {...formItemLayout} label="是否启用">
               {getFieldDecorator('isEnable', {initialValue: true, valuePropName: 'checked' })(
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
  }

   constructor(props){
     super(props);
     this.onChildMessageCallback = this.props.t_onChildMessage;
   }

   componentWillReceiveProps(nextProps) {
    this.setState({
      isShowing: nextProps.t_visable
    });
   }

   handleButtonOk= (e) => {
     this.formRef.raiseSubmit((err,result)=>{
       if(err){
         message.error(err.message);
         console.log("ERR:"+err.message);
         return;
       }
       this.onChildMessageCallback("msg_add_success");
     });
   }

   //添加用户信息 对话的 cance 按钮点击事件
   closeDialogAdd = (e) => {
     this.onChildMessageCallback("msg_add_cancel");
     this.setState({ isShowing: false });
   }

   saveFormRef = (formRef) =>{
     this.formRef = formRef;
   }

   render() {
     console.log("ChannelAdd render WrapDialog t_visable="+this.props.t_visable);
     let { app_name } = this.props;
     if(!app_name) throw "缺少参数：app_name";

     const dialogSetting={
       title:"添加新channel",
       cancelText:"取消",
       okText:"确定",
       confirmLoading:this.state.isLoading,
       destroyOnClose:true,
       maskClosable:false
     }

     const WrappedNormalForm = Form.create()(ChannelAddForm);
     return(
       <Modal
           {...dialogSetting}
         visible={this.state.isShowing}
         onOk={this.handleButtonOk}
         onCancel={this.closeDialogAdd}>
         <WrappedNormalForm
           app_name={app_name}
           wrappedComponentRef={this.saveFormRef}></WrappedNormalForm>
       </Modal>
     );
   }
}

export default WrapDialog;
