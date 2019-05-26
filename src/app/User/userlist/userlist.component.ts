import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';

const GetUserList = gql`
  query GetUserList {
    allUsers{
      username
      name
      email
      password
      user_type
      created_at
      updated_at
    }
  }
`;

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit ,OnDestroy{


  @Input() listOfData: any[] = [];
  bordered = false;
  loading = true;
  sizeChanger = false;
  pagination = true;
  header = true;
  title = true;
  footer = false;
  fixHeader = false;
  size = 'small';
  expandable = true;
  checkbox = true;
  allChecked = false;
  indeterminate = false;
  displayData: any[] = [];
  simple = true;
  noResult = false;
  position = 'bottom';

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  currentPageDataChange(
    $event: Array<{
      name: string;
      username: number;
      email: string;
      user_type: string;
      checked: boolean;
      expand: boolean;
      description: string;
    }>
  ): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
    console.log(this.listOfData.filter(value => value.checked));
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GetUserList
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        
        console.log(data);
        for (let i = 0; i < data.allUsers.length; i++) {
          console.log(this.loading);
          this.listOfData.push({
            name: data.allUsers[i].name,
            username: data.allUsers[i].username,
            email: data.allUsers[i].email,
            user_type: data.allUsers[i].user_type,
            description: `Created at: ${data.allUsers[i].created_at}, Updated at: ${data.allUsers[i].updated_at}`,
            checked: false,
            expand: false
          });
        }
        this.listOfData=[...this.listOfData]
        this.loading = loading;
        console.log(this.loading);
      });
    
  }

 

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  noResultChange(status: boolean): void {
    this.listOfData = [];
    if (!status) {
      this.ngOnInit();
    }
  }

}
