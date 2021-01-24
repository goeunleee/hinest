import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  
  beforeAll(async () => {
    console.log("before all");
  })


  afterAll(async () => {
    console.log("after all");
  })

  afterEach(async () => {
    console.log("after each~");
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array)
    })
  }) //unit test!~ 

 

  describe("getOne", () => {
    it("should return a movie", () => {
      service.create({
        title: "testmovie",
        genres: ['test'],
        year: 2000,
      })
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with id 999 not found");
      }
    });

  });

  describe("deleteOne", () => {
    it("delete a movie", () => {
      service.create({
        title: "testmovie",
        genres: ['test'],
        year: 2000,
      });
      const beforedelete = service.getAll().length;
      service.deleteOne(1)
      const afterdelete = service.getAll().length;

      expect(afterdelete).toBeLessThan(beforedelete);
    });
    it("should return a 404", () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

  });

  describe("create", () => {
    it("should create a movie", () =>{
      const beforecreate = service.getAll().length
      service.create({
        title: "testmovie",
        genres: ['test'],
        year: 2000,
      });
      const aftercreate = service.getAll().length
      console.log(beforecreate,aftercreate);
      expect(aftercreate).toBeGreaterThan(beforecreate);
    });
  });

  describe("update", () =>{
    it("should update a movie", () =>{
      service.create({
        title: "testmovie",
        genres: ['test'],
        year: 2000,
      });
      service.update(1, {title:"updated test"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("updated test");

    })

    it("should return a 404", () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });


});
