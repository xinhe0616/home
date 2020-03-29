package cn.xinhe.task;

import cn.xinhe.http.HttpGet;
import org.json.JSONObject;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
/**
 * 开启定时任务的注解
 */
@EnableScheduling
public class GetFlash {
    static String getBing;

    public GetFlash() {
        HttpGet httpGet = new HttpGet();
        JSONObject res = httpGet.getAuth("https://api.no0a.cn/api/bing/0", "");
        getBing = res.toString();
    }

    public static String getGetBing() {
        return getBing;
    }

    public static void setGetBing(String getBing) {
        GetFlash.getBing = getBing;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void job2(){
        HttpGet httpGet = new HttpGet();
        JSONObject res = httpGet.getAuth("https://api.no0a.cn/api/bing/0", "");
        getBing = res.toString();
    }
}
