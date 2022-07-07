<template>
	<el-container class="container">
		<el-header style="padding: 0;">
			<el-menu
			    background-color="#545c64"
			    text-color="#fff"
			    active-text-color="#fff"
			    :default-active="activeIndex"
			    class="el-menu-demo"
			    mode="horizontal"
			    :ellipsis="false"
			  >
			    <el-menu-item index="0">Post Window请求助手</el-menu-item>
			    <div class="flex-grow" />
			   
			    <el-sub-menu index="1">
			      <template #title>{{projectData.nowProject.name}}</template>
			      <el-menu-item v-for="(item, key) in projectData.projectList" :index="key" @click="projectSelect(key)">{{item.name}}</el-menu-item>
			    </el-sub-menu>
				 <el-menu-item index="2" class="top-menu-icon" @click="addProject()"><el-icon><Plus /></el-icon></el-menu-item>
				 <el-menu-item index="3" class="top-menu-icon" @click="setProject()"><el-icon><setting /></el-icon></el-menu-item>
			  </el-menu>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu
				        default-active="1"
				        class="el-menu-vertical-demo"
				        @open="handleOpen"
				        @close="handleClose"
				      >
				        <el-sub-menu :index="index" v-for="(group, index) in projectData.nowProjectInterface">
				          <template #title>
				            <span>{{group.name}}</span>
				          </template>
						<el-menu-item v-for="(item, key) in group.list" :index="key" @click="interfaceSelect(index, key)">{{item.name ? item.name : item.requestType+"/"+item.path}}</el-menu-item>
				       
				        </el-sub-menu>
				        
				      </el-menu>
			</el-aside>
			<el-container>
				<el-main>
					<el-form :model="form" label-position="top">
						<el-form-item label="接口名称">
							<el-input v-model="form.name" placeholder="可为空"></el-input>
						</el-form-item>	
						<el-form-item label="请求地址">
							<el-col :span="5">
								<el-select v-model="form.requestType" placeholder="请选择请求类型">
									<el-option label="GET" value="GET"></el-option>
							  <el-option label="POST" value="POST"></el-option>
									<el-option label="PUT" value="PUT"></el-option>
									<el-option label="DELETE" value="DELETE"></el-option>
									<el-option label="OPTIONS" value="OPTIONS"></el-option>
									<el-option label="PATCH" value="PATCH"></el-option>
									<el-option label="TRACE" value="TRACE"></el-option>
								</el-select>
							</el-col>
							<el-col :offset="1" :span="18">
								<el-input v-model="form.path" placeholder="请输入请求接口地址 " prop="path"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="设置信息">
							<el-row :gutter="20">
								<el-col :span="8">
									<el-select v-model="form.contentType" placeholder="ContentType">
										<el-option label="text/html" value="text/html"></el-option>
										<el-option label="application/x-www-form-urlencoded"
											value="application/x-www-form-urlencoded"></el-option>
										<el-option label="application/json" value="application/json"></el-option>
										<el-option label="text/json" value="text/json"></el-option>
									</el-select>
							 </el-col>
								<el-col :span="8">
									<el-select v-model="form.encod" placeholder="编码方式">
										<el-option label="UTF-8" value="UTF-8"></el-option>
										<el-option label="GBK" value="GBK"></el-option>
										<el-option label="GB2312" value="GB2312"></el-option>
									</el-select>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="请求头">
							<el-row :span="24" :gutter="20" class="input-group" v-for="(item,index) in form.header" :key="index">
								<el-col :span="6">
							  <el-input v-model="item.key" placeholder="key"></el-input>
								</el-col>
								<el-col :span="14">
									<el-input v-model="item.value" placeholder="value"></el-input>
								</el-col>
								<el-col :span="2">
									<el-button type="danger" plain size="medium" @click="delHeader(item, index)">删除
									</el-button>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" plain size="medium" @click="addHeader">添加header</el-button>
							<el-button type="primary" plain size="medium" @click="batchAddFormVisible = true;batchAddForm.type='header'">批量添加</el-button>
						</el-form-item>
						<el-form-item label="请求参数">
							<el-row class="input-group" v-for="(item,index) in form.params" :key="index">
								<el-col :span="6">
									<el-input v-model="item.key" placeholder="key"></el-input>
								</el-col>
								<el-col :offset="1" :span="14">
									<el-input v-model="item.value" placeholder="value"></el-input>
								</el-col>
								<el-col :offset="1" :span="2">
									<el-button type="danger" plain size="medium" @click="delParams(item,index)">删除
									</el-button>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" plain size="medium" @click="addParams">添加请求参数</el-button>
							<el-button type="primary" plain size="medium" @click="batchAddFormVisible = true;batchAddForm.type='param'">批量添加</el-button>
						</el-form-item>
						<el-form-item label="cookie">
							<el-input type="textarea" v-model="form.cookies"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="sendRequest(form)">立即请求</el-button>
							<el-button>取消</el-button>
					 </el-form-item>
					</el-form>
					<el-alert v-show="request_tips.show" :title="request_tips.msg" :type="request_tips.status"
						:closable="false" show-icon>
					</el-alert>
					<view class="json-data">
						<json-viewer :value="jsonData" :expand-depth="5" :copyable="copyable" boxed sort theme="jv-light"
							:expanded="true">
						</json-viewer>
					</view>
				</el-main>
			</el-container>
		</el-container>
		<el-dialog v-model="batchAddFormVisible" title="批量添加">
		    <el-form :model="batchAddForm" label-position="top">
				<el-form-item label="">
				      <el-input v-model="batchAddForm.value" type="textarea" :rows="5" resize='none' placeholder="支持json格式和key=valye&key1=value1格式" />
				</el-form-item>
		    </el-form>
		    <template #footer>
		      <span class="dialog-footer">
		        <el-button @click="batchAddFormVisible = false">取消</el-button>
		        <el-button type="primary" @click="batchAddFormSubmit()"
		          >确认添加</el-button
		        >
		      </span>
		    </template>
		  </el-dialog>
		  <el-dialog v-model="projectFormVisible" title="添加项目">
		      <el-form :model="projectForm" label-position="left" label-width="100px">
				<el-form-item label="项目名称">
				    <el-input v-model="projectForm.name" />
				</el-form-item>
		  		<el-form-item label="项目简介">
		  		      <el-input v-model="projectForm.info" type="textarea" :rows="5" resize='none' placeholder="" />
		  		</el-form-item>
				<el-form-item label="项目BaseUrl">
				      <el-input v-model="projectForm.baseUrl" />
				</el-form-item>
				<el-form-item label="导入项目">
				      <el-input v-model="projectForm.importUrl" />
				</el-form-item>
				<el-form-item label="自动记录接口">
				      <el-switch v-model="projectForm.autoInterface" />
				</el-form-item>
				<el-form-item label="保存日志数量">
				      <el-input v-model="projectForm.logNum" />
				</el-form-item>
				
		      </el-form>
		      <template #footer>
		        <span class="dialog-footer">
		          <el-button @click="projectFormVisible = false">取消</el-button>
		          <el-button type="primary" @click="projectFormSubmit()"
		            >确认添加</el-button
		          >
		        </span>
		      </template>
		   </el-dialog>
	</el-container>
</template>

<script>
	import {isJson, kvToJson, createHash, createInterfaceKey, getTime} from "../common/function.js";
	import localStorage from "../common/localStorage.js";
	const {ipcRenderer} = window.require('electron');
	export default {
		data() {
			return {
				batchAddFormVisible:false,
				projectFormVisible:false,
				form: {
					name: "",
					requestType: 'GET',
					path: '',
					contentType: 'application/json',
					encod: 'UTF-8',
					header: [{
						key: "",
						value: ""
					}],
					params: [{
						key: "",
						value: ""
					}],
					cookies: ''
				},
				batchAddForm: {
					value:"",
					type:"header"
				},
				projectForm: {
					name:"",
					info:"",
					key:"",
					baseUrl:"",
					importUrl:"",
					autoInterface:false,
					logNum:20,
					action:"add",
				},
				projectData:{
					projectList: {},
					nowProject: {},
					nowProjectInterface: {"ok3lvo5f3hh5":{name:"默认分组",key:"ok3lvo5f3hh5",info:"",list:{}}}, //项目接口初始化
					nowProjectKey:"",
				},
				copyable: {
					copyText: '复制',
					copiedText: 'ing...',
					timeout: 1000
				},
				jsonData: {},
				request_tips: {
					status: 'success',
					msg: 'ok',
					code: '200',
					show: false,
				}
			}
		},
		
		created() {
		  this.getProjectList();
		  if(localStorage.has('nowProjectKey')){
			  this.projectData.nowProjectKey = localStorage.get('nowProjectKey');
		  }
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			//批量添加
			batchAddFormSubmit(){
				
			    if (this.batchAddForm.value == '') {
						this.$message.error('批量添加内容不能为空');
						return false;
			    }
				let addParam = {};
			    if(!isJson(this.batchAddForm.value)){
					addParam = kvToJson(this.batchAddForm.value);
				}else{
					addParam = JSON.parse(this.batchAddForm.value);
				}
				for(let v in addParam){
					if(this.batchAddForm.type == "header"){
						this.form.header.push({key:v,value:addParam[v]});
					}else if(this.batchAddForm.type == "param"){
						this.form.params.push({key:v,value:addParam[v]});
					}
				}
				console.log(this.form.header);
				this.batchAddForm.value = '';
				this.batchAddFormVisible = false;
			},
			//添加项目或者设置项目
			projectFormSubmit(){
				
				
				if (this.projectForm.name == '') {
					this.$message.error('项目名称必填');
					return false;
				}
				let key = "";
				if(this.projectForm.action == 'add'){
					 key = createHash(12);
				}else {
					 key = this.projectData.nowProject.key;
				}
				let projectList = this.projectData.projectList;
				const project = {
					name: this.projectForm.name,
					info: this.projectForm.info,
					key: key,
					logNum:this.projectForm.logNum,
					baseUrl: this.projectForm.baseUrl,
					importUrl: this.projectForm.importUrl,
					autoInterface: this.projectForm.autoInterface
				};
				projectList[key] = project;
				this.projectData.projectList = projectList;
				projectList = JSON.stringify(projectList)
				this.setProjectList(projectList);
				this.projectForm = {
					name:"",
					info:"",
					key:"",
					baseUrl:"",
					importUrl:"",
					autoInterface:false,
				};
				this.projectFormVisible = false;
				this.$message.success('操作成功');
			
			},
			//切换项目
			projectSelect(key){
				localStorage.set('nowProjectKey',key);
				this.projectData.nowProject = this.projectData.projectList[key];
			},
			sendRequest(formName) {
				 if (this.form.path == '') {
						this.$message.error('请求地址必填');
						return false;
				 }
				 let params = {};
				 let header = {};
				 this.form.header.forEach((item) => {
					if (item.key != "") {
						header[item.key] = item.value;
					}
				 })
				 this.form.params.forEach((item) => {
					if (item.key != "") {
						params[item.key] = item.value;
					}
				 })
				let pthis = this;
				let url = this.projectData.nowProject.baseUrl+this.form.path;
				this.$axios({
					url: url,
					method: pthis.form.requestType,
					headers: header,
					data: params,
				}).then(res => {
					pthis.jsonData = res.data;
					this.request_tips.code  = res.status;
					this.request_tips.show  = true,
					this.request_tips.msg 	= '200 ' + 'ok';
					this.request_tips.status = 'success';
				}).catch(err => {
					pthis.jsonData = err.response.data;
					this.request_tips.show = true,
						this.request_tips.msg = err.code + ' ' + err.message;
					this.request_tips.status = 'error';
				})
				//自动添加接口
				if(this.projectData.nowProject.autoInterface){
					this.addNowInterfaceList();
				}
				//自动添加记录
				if (this.projectData.nowProject.logNum > 0) {
					this.setInterfaceLog();
				}
			},
			addHeader() {
				this.getProjectList();
				console.log(this.projectData.projectList);
				this.form.header.push({
					key: "",
					value: ""
				});
			},
			delHeader(item, index) {
				this.form.header.splice(index, 1);
			},
			addParams() {
				this.form.params.push({
					key: "",
					value: ""
				});
			},
			delParams(item, index) {
				this.form.params.splice(index, 1);
			},
			//添加项目
			addProject() {
				
				this.projectFormVisible = true;
				this.projectForm = {
					name:"",
					info:"",
					key:"",
					baseUrl:"",
					importUrl:"",
					autoInterface:"",
					action:"add",
				};
			},
			setProject() {
			  	this.projectFormVisible = true;
				this.projectForm = this.projectData.nowProject;
				this.projectForm.action = "set";
			  	
			},
			getProjectList(){
				let pthis = this;
				ipcRenderer.invoke('file-read','','projectList.json').then((res) => {
					
					let projectList = JSON.parse(res);
					
					pthis.projectData.projectList = projectList;
					
					if(pthis.projectData.nowProjectKey){
						pthis.projectData.nowProject = projectList[pthis.projectData.nowProjectKey]
					} else {
						for(let key in projectList)
						{
							pthis.projectData.nowProject = projectList[key];
							break;
						}
					}
					pthis.getNowInterfaceList();
					
				}).catch(function(error){
						
				});
			},
			//根据项目名称获取项目下接口
			getProjectListValue(){
				
			},
			setProjectList(projectList){
				ipcRenderer.invoke('file-write',projectList,'','projectList.json')
			},
			setNowProjectInterfaceList(nowProjectInterface){
				ipcRenderer.invoke('file-write',nowProjectInterface,this.projectData.nowProjectKey+"/",'projectInterfaceList.json');
			},
			//将当前请求接口加入
			addNowInterfaceList(){
				let defaultKey = "ok3lvo5f3hh5";
				let interfaceKey = createInterfaceKey(this.form.requestType, this.form.path);
				let nowForm = this.form;
				//过滤掉内容
				for(let i in nowForm.parpms){
					nowForm.parpms[i].value="";
				}
				for(let i in nowForm.header){
					nowForm.header[i].value="";
				}
				this.projectData.nowProjectInterface[defaultKey].list[interfaceKey] = nowForm;
				let nowProjectInterface = JSON.stringify(this.projectData.nowProjectInterface)
				this.setNowProjectInterfaceList(nowProjectInterface);
			},
			getNowInterfaceList(){
				let pthis = this;
				ipcRenderer.invoke('file-read',this.projectData.nowProjectKey+"/",'projectInterfaceList.json').then((res) => {
					
					let nowProjectInterface = JSON.parse(res);
					pthis.projectData.nowProjectInterface = nowProjectInterface;
					
				}).catch(function(error){
						
				});
			},
			//切换接口地址
			interfaceSelect(groupKey, interfaceKey){
				this.form = this.projectData.nowProjectInterface[groupKey].list[interfaceKey];
			},
			setInterfaceLog(interfaceKey){
				let pthis = this;
				ipcRenderer.invoke('file-read',this.projectData.nowProjectKey+"/",interfaceKey+'.json').then((res) => {
					
					let interfaceLogList = JSON.parse(res);
					pthis.setInterfaceLogAct(interfaceLogList, interfaceKey);
					
				}).catch(function(error){
					pthis.setInterfaceLogAct([], interfaceKey);	
				});
				
			},
			setInterfaceLogAct(interfaceLogList, interfaceKey){
				if(interfaceLogList.length >= this.projectData.nowProject.logNum){
					interfaceLogList.shift();
				}
				let logList = {
					times: getTime(),
					resources: this.jsonData,
					request: this.form,
				};
				interfaceLogList.push(logList);
				ipcRenderer.invoke('file-write',interfaceLogList,this.projectData.nowProjectKey+"/",interfaceKey+'.json');
			}
		
		}
	}
</script>
<style>
	.container {
		width: 100%;
		/* max-width: 1200px; */
		margin: 0 auto;
		user-select: text;
	}

	.input-group {
		margin-bottom: 10px;
	}

	.json-data {
		margin-top: 20px;
		text-align: left;
	}
	.flex-grow{
		 flex-grow: 2;
	}
	.top-menu-icon{
		height:56px !important;
	}
</style>
