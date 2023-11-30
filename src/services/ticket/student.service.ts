import { Injectable } from '@angular/core';
import { STUDENTS_MOCKED } from '../../mocks/tickets.mock'
import { Student } from 'src/models/student';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class StudentService {
    public studentList: Student[] = STUDENTS_MOCKED;
    public studentToUpdate: Student;
    public modifStudent: boolean = false;
    // public apiUrl = "api/students";
    public apiUrl = "http://localhost:9428/api/students/";
    public headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    private reloadSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public student$: BehaviorSubject<Student[]> = new BehaviorSubject(this.studentList);

    constructor(public httpClient: HttpClient) {}

    reloadComponent(): void {
        this.reloadSubject.next(true);
    }

    getReloadObservable(): Observable<boolean> {
        return this.reloadSubject.asObservable();
    }

    async getStudent(): Promise<Student[]> {
        return await this.httpClient.get<Student[]>(this.apiUrl).toPromise();
    }

    async getOneStudent(id: number): Promise<Student> {
        return await this.httpClient.get<Student>(this.apiUrl + id + '/').toPromise();
    }

    async createStudent(student: Student): Promise<Student> {
        return await this.httpClient.post<Student>(this.apiUrl, student)
        .toPromise();
    }

    async deleteStudent(id: number): Promise<Student> {
        return await this.httpClient.delete<Student>(this.apiUrl + id + '/').toPromise();
    }

    // async getStudent(): Promise<Student[]> {
    //     return await Promise.resolve(this.studentList);
    //     // return await this.httpClient.get<Student[]>(this.apiUrl).toPromise();
    // }

}