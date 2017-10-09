import { Component, OnInit } from '@angular/core';
import { FreelanceApiService } from '../../services/freelance-api.service'
import { TagInputModule } from 'ngx-chips';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { SessionService } from '../../services/session.service'
import { HelpersService } from '../../services/helpers.service'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  
  feedback: string;
  userId: any = JSON.parse(localStorage.getItem('user'))._id;
  serviceId: String;
  servicesList: any =[];
  newService: any = {
   
    

  };
  tags: string;
  uploader: FileUploader = new FileUploader({
    url: `${environment.baseURL}/api/service/image`,
    authToken: "Bearer " + this.session.token,

  });

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }


  constructor(private freelanceApi: FreelanceApiService, private helpers: HelpersService, private session: SessionService) { }

  ngOnInit() {
    
    //Service List
    this.freelanceApi.servicesList(this.userId)
      .subscribe((list) => {
        this.servicesList = list;
      });
      //uploader
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;

    };
  }
  
  submitService(myForm){
    this.helpers.formatTags(this.newService.tags, (tags, myForm)=>{
      this.uploader.onBuildItemForm = (item, form) => {
        item.withCredentials = false;
        form.append('name', this.newService.name);
        form.append('description', this.newService.description);
        form.append('tags', tags);
        form.append('user', this.userId);
      };
      this.uploader.uploadAll();
      this.newService = {};
      // this.freelanceApi.editUserProfile(this.user)
      //   .subscribe((user) => {
      //   });
    })
    
  }
  

}
