import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable()
export class AppService {
    titles: string[];
    titlesChanged = new Subject<string[]>();

    constructor(private http: HttpClient) { }

    async getTitles(substr: string) {
        this.titles = [];
        let pageNumber = 1;
        let totalPage = 0;

        while (true) {
            let data = await this.http.get(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}&page=${pageNumber}`).toPromise();
            totalPage = data['total_pages'];
            let movies = data['data'];
            for (let i in movies) {
                this.titles.push(movies[i].Title);
            }
            pageNumber++;
            if (pageNumber > totalPage) {
                break;
            }
        }
        this.titles.sort();
        this.titlesChanged.next(this.titles.slice());
    }
}