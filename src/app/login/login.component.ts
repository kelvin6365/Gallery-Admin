import { TokenService } from './../Services/token.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
const LoginMutation = gql`
  mutation LoginMutation($data:LoginInput!){
    login(data: $data) {
      access_token
      refresh_token
      expires_in
    }
  }
`;

const LoginFormGetUserInfoQuery = gql`
  query LoginFormGetUserInfoQuery($username:String!){
    user(username:$username){
      username
      email
      name
      UserFavourites {
        video_id
      }
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      
    }
    
    if(this.validateForm.controls.userName.status=="VALID"&&this.validateForm.controls.password.status=="VALID"){
      console.log("VALID Done",this.validateForm.controls);
      this.newRepository(
        {
          username:this.validateForm.controls.userName.value,
          password:this.validateForm.controls.password.value
        }
      );
    }
  }

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private Token:TokenService,
    private router: Router
  ) {}

  newRepository(userData): void {
    this.apollo.mutate({
      mutation: LoginMutation,
      variables: {
        data:userData
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.Token.set(data.login.access_token,data.login.refresh_token);
      this.getUserInfo(userData);
      
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  getUserInfo(userData): void {
    this.apollo.watchQuery<any>({
      query: LoginFormGetUserInfoQuery,
      variables: {
        username: userData.username
      },
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log("Get User Data:",data);
        localStorage.setItem("user_data",JSON.stringify(data.user));
        this.router.navigate(['/m']);
      });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
