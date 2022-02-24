import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IGarden } from "src/model/garden";
import {catchError, tap } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})

export class TasksService {
    private gardenUrl = "http://localhost:26807/api/v1/";
    

    constructor(private http: HttpClient) {}

    getGarden(): Observable<IGarden[]> {
        return this.http.get<IGarden[]>(this.gardenUrl + 'read-data-all').pipe(
            tap(data => console.log('from get', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    waterPlants(plant: IGarden): Observable<any> {
      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      }
      const body = plant;//JSON.stringify(plant);
      console.log(body);
        return this.http.put(this.gardenUrl + 'multi-plant-water', body, {'headers': headers})
        .pipe(
          tap(data => console.log('From put', JSON.stringify(data))),
              catchError(this.handleError)
        );  

      
    }
      
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }
      
      
}




