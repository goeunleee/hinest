import { Controller, Get,Render } from '@nestjs/common';

@Controller('')
export class AppController {

    @Get()
    @Render('index')
    root() {
        return { message: '^^ nestjs ^^' };
    }


    

   /* @Get()
    home(){
        return "welcome to my movie api";
    } 
    */
}
