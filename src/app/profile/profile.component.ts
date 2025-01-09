import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButton, RouterLink, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private userService: UserService
  public active: UserModel | null = null
  constructor(private router: Router, private route: ActivatedRoute) {
    this.userService = UserService.getInstance()
  }
  ngOnInit(): void {
    try {
      this.active = this.userService.getCurrentUser()
    } catch (e) {
      
      this.router.navigate(['/login'], {relativeTo: this.route })
    }
  }

  public getAvatarUrl(){
    
    return 'https://ui-avatars.com/api/?name=' + this.active?.name
}

public doLogout(){
  this.userService.logout()
  this.router.navigate(['/'], {relativeTo: this.route })
}

public doPasswordChange(){

}

}
