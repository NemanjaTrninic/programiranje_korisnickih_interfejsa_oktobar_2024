import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private static instance: UserService

    private constructor() {
    }

    public static getInstance() {
        if (this.instance == null)
            this.instance = new UserService
        return this.instance
    }

    private retriveAllUsers(): UserModel[] {
        let json = localStorage.getItem('users')
        if (json == null) {
            const defaultUser = {
                email: 'nemanja.trninic.22@singimail.rs',
                name: 'nemanja',
                password: 'tnemanja98', // brisanje bcrypta jer ne podrzava frontend
                booked: [145324, 145469] //random letovi
            }
            localStorage.setItem('users', JSON.stringify([defaultUser]))
            json = localStorage.getItem('users')
        }

        return JSON.parse(json!)
    }

    public createUser(model: UserModel) {

        const arr = this.retriveAllUsers()
        if (arr.find(user => user.email = model.email))
            throw new Error('Email already exists!')
        arr.push(model)
        localStorage.setItem('users', JSON.stringify(arr))
    }

    public login(email: string, password: string) {
        const arr = this.retriveAllUsers()
        const usr = arr.find(user => user.email == email && password == user.password)
        if (usr == undefined)
            throw new Error('Login failed!')

        sessionStorage.setItem('active', usr.email)

    }

    public getCurrentUser() {
        if (!sessionStorage.getItem('active'))
            throw new Error('No active User      ')

        const email = sessionStorage.getItem('active')
        const arr = this.retriveAllUsers()
        const usr = arr.find(user => user.email == email)

        if (usr == undefined)
            throw new Error('No active User ')
        return usr
    }

    public hasCurrentUser() {
        return sessionStorage.getItem('active') ? true : false
    }

    public changePassword(password: string) {
        const active = this.getCurrentUser()
        active.password = password

        const all = this.retriveAllUsers()
        for (let user of all)
            if (user.email == active.email) {
                user = active
            }

        localStorage.setItem('users', JSON.stringify(all))
    }

    public logout() {
        const usr = this.getCurrentUser()
        sessionStorage.removeItem('active')
    }


}