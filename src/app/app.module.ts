import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { setContext } from 'apollo-link-context';
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { GraphQLModule } from './graphql.module';
import { TokenService } from './Services/token.service';
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(en);

const autoSwitchIP = () => {
  switch(window.location.hostname){
      case "localhost":
          return "http://localhost:8000/graphql";
      case "192.168.1.80":
          return "http://192.168.1.80:8000/graphql";
  }
}


const auth = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
 
  const token = localStorage.getItem('access_token');
  console.log(token);
  // return the headers to the context so httpLink can read them
  // in this example we assume headers property exists
  // and it is an instance of HttpHeaders
  if (!token) {
    return {};
  } else {
    return {
      headers: {Authorization: `Bearer ${token}`}
    };
  }
});


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    GraphQLModule,
    ApolloModule,
    HttpLinkModule,
    AppRoutingModule
  ],
  providers: [
    TokenService,
    { 
      provide: NZ_I18N, 
      useValue: en_US,
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const http = httpLink.create({
          uri: autoSwitchIP()
        });
        return {
          cache: new InMemoryCache(),
          link: auth.concat(http)
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
