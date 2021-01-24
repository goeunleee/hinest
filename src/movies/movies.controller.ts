import { Controller, Delete, Get, Param, Patch, Post, Body,Req, Query, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
@Controller('movies')
export class MoviesController {
    
    constructor(private readonly movieService:MoviesService){}

    @Get()
    getAll(): Movie[]{
        
        return this.movieService.getAll();
    }
    

    @Get("/:id")
    getOne(@Param('id') movieid:number): Movie{
        return this.movieService.getOne(movieid);
    }

   
    
    @Post()
    create(@Body() movieData:CreateMovieDto){
        console.log(movieData);
        return this.movieService.create(movieData);
    }
    

    @Delete("/:id")
    remove(@Param('id') movieid: number){
        return this.movieService.deleteOne(movieid);
    }

    @Patch('/:id')
    patch(@Param('id') movieid: number, @Body() updateData:UpdateMovieDto){
       return this.movieService.update(movieid, updateData);
    }

  
}
