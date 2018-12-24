//图片预加载插件
function PreLoad(imgs,options){
	this.imgs = (typeof imgs ==='string') ? [imgs] : imgs;
	this.opts = Object.assign({},PreLoad.DEFAULTS,options);

	//无序加载方法
	this._unoredered();
}
PreLoad.DEFAULTS = {
	each : null,//每张图片加载完毕后执行
	all : null,//所有图片加载完毕后执行
};
PreLoad.prototype._unoredered = function(){
	//无序加载方法
	var imgs = this.imgs;
	for(var i= 0; i < imgs.length; i++){
		var imgObj = new Image();
		imgObj.onload = function(){
			
		}
	}
}
