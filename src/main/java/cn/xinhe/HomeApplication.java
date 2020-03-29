package cn.xinhe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

//重写入口函数
@SpringBootApplication
@EnableScheduling
@EnableCaching
public class HomeApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(HomeApplication.class, args);
    }
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(HomeApplication.class);
    }

}
