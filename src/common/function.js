
import md5 from 'js-md5';
export function	isJson(str) {
		if (typeof str == 'string') {
			try {
				var obj=JSON.parse(str);
				if(typeof obj == 'object' && obj ){
					return true;
				}else{
					return false;
				}
			} catch(e) {
				return false;
			}
		}
	}
export function	kvToJson(str){
		let param = str.split("&");
		let paramJson = {};
		param.forEach(function(val){
			let value = val.split("=");
			paramJson[value[0]] = value[1];
		})
		return paramJson;
}
export function createHash (hashLength) {
	if (!hashLength || typeof(Number(hashLength)) != 'number') {return;}
	var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
	var hs = [];
	var hl = Number(hashLength);
	var al = ar.length;
	for (var i = 0; i < hl; i ++) {
		hs.push(ar[Math.floor(Math.random() * al)]);
	}
	return hs.join('');
}
export function createInterfaceKey(type, path) {
	if(!type || !path) {return;}
	let key = md5(type+path);
	return key.slice(8,24);
}
export function getTime(){
	let myDate = new Date((new Date).getTime() + 8*60*60*1000);
	let time = myDate.toJSON().split('T').join(' ').substr(0,19);
	return time;
}