package cn.xinhe.controller;


import cn.xinhe.task.GetFlash;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class indexController {

    @RequestMapping({"/","index"})
    public String  index(){
        return "xinhe";
    }
    @GetMapping("bing")
    @ResponseBody
    public String  getImgUrl(){
        return GetFlash.getGetBing();
    }
}
