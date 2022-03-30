export function GetWiFiAndLocation() {
	const _this = this;
	const wifiList = [];

	return new Promise(function(resolve) {
		uni.getLocation({
			type: 'wgs84',
			success: function(positionList) {
				// #ifdef APP-PLUS
				const mainActivity = plus.android.runtimeMainActivity();
				const Settings = plus.android.importClass("android.provider.Settings");
				const MainActivity = plus.android.runtimeMainActivity();
				const Context = plus.android.importClass('android.content.Context');

				plus.android.importClass("android.net.wifi.WifiManager");
				plus.android.importClass("android.net.wifi.ScanResult");
				plus.android.importClass("android.net.wifi.WifiInfo");
				plus.android.importClass("java.util.ArrayList");

				const wifiManager = MainActivity.getSystemService(Context.WIFI_SERVICE);
				const resultList = wifiManager.getScanResults();
			
				// 如果没有获取成功
				if (!resultList || !resultList?.size) {
						console.log("WIF初始化未成功");
				}
				// 如果获取成功
				else {
					console.log(resultList.size());
					for (let i = 0; i < resultList.size(); i++) {
						//	 ssid名称、bssidmac地址、level信号强弱
						wifiList.push({
							name: resultList.get(i).plusGetAttribute('BSSID'),
							ssid: resultList.get(i).plusGetAttribute('SSID'),
							level: resultList.get(i).plusGetAttribute('level'),
							id: i
						});
					}
				}
				// #endif

				resolve({
					wifiList,
					positionList
				});
			}
		});
	});
}