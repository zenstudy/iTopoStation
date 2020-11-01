//此类主要用于描述系统内定义的各类，并对关键字段进行描述
var iTopoDefinitionSet = {

	taskInfo: function () {
		var dataInfo = {
			objectUUID :"" ,
			taskUUID:"",
			taskType:"", //"CommonTask","MessageToRead","JoiningApplyToVote"
			generatedFromTaskUUID: "", //上一级任务
			taskTitle:"",
			taskCreatedby:"",
			taskStatus:"",
			taskDescription:"" ,
			applyDetail:{applicantUUID:" ", teamUUID:" ", reason:" "},
			voteDetail:[], // {voter: '', result: "agree" or "against", }
		};
		return dataInfo;
	}
};

export { iTopoDefinitionSet };
