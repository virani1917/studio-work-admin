import { AdminService } from "./../_services/admin.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-studio-details',
  templateUrl: './studio-details.component.html',
  styleUrls: ['./studio-details.component.css']
})
export class StudioDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AdminService: AdminService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getStudiodetails();
  }

  configEditor = {
    removeButtons:
      "Print,Preview,NewPage,Source,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Checkbox,TextField,Textarea,Radio,Form,Select,Button,ImageButton,HiddenField,Replace,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About,FontSize,Image",
    toolbarGroups: [
      { name: "document", groups: ["mode", "document", "doctools"] },
      {
        name: "editing",
        groups: ["find", "selection", "spellchecker", "editing"],
      },
      { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
      { name: "styles", groups: ["styles"] },
      { name: "paragraph", groups: ["list", "indent", "blocks"] },
      "/",
      { name: "clipboard", groups: ["clipboard", "undo"] },
      { name: "paragraph", groups: ["align", "bidi", "paragraph"] },
      { name: "forms", groups: ["forms"] },
      { name: "links", groups: ["links"] },
      { name: "colors", groups: ["colors"] },
      { name: "insert", groups: ["insert"] },
      "/",
      { name: "tools", groups: ["tools"] },
      { name: "others", groups: ["others"] },
      { name: "about", groups: ["about"] },
    ],
    removePlugins: "exportpdf",
  };

  public studioObj: any = {
    description:"",
    mediaGallery: [],
    has_details: "1"
  };

  public mediaArray: any[] = null;

  public isprojectSave: boolean = false;

  getStudiodetails() {
    this.AdminService.studioDetail({id : "1"}).subscribe((response: any) => {
      if (response.success == 1) {
        this.studioObj = response.studio;
        // this.studioObj.mediaGallery = this.studioObj.image;
        // // if (!Array.isArray(this.studioObj.mediaGallery)) {
        // // }
        // this.mediaArray = [...this.studioObj.image];
      }else {
        this.studioObj ={
          description:"",
          mediaGallery: [],
        }       
      }
    });
  }

  onMediaChange(event: any) {
    // this.mediaArray = [];
    const files = event.target.files;
    this.studioObj.mediaGallery = [];
    for (let key in files) {
      const file = files[key];
      if (file instanceof Blob) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (!this.mediaArray) {
            this.mediaArray = [];
          }
          this.mediaArray.push({ image: e.target.result });
          this.studioObj.mediaGallery.push(file);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Media Gallery Remove Function
  removeMedia(index: number, removeId: any) {
    this.mediaArray.splice(index, 1);
    this.studioObj.mediaGallery.splice(index, 1);
    if (removeId) {
      this.studioObj.removeMedia.push(removeId);
    }
  }

  removeimageMedia(index: number, removeId: any) {
    this.studioObj.image.splice(index, 1);
    if (removeId) {
      if(!this.studioObj.removeMedia){
        this.studioObj.removeMedia = [];
      }
      
      this.studioObj.removeMedia.push(removeId);
    }
  }



  addProject(form) {
    let formdata = new FormData();
    formdata.append("from_app", "true");



    for (let key in this.studioObj) {
      if (key === "mediaGallery" && this.studioObj.mediaGallery) {
        for (let i = 0; i < this.studioObj.mediaGallery.length; i++) {
          formdata.append(`image[${i}]`, this.studioObj.mediaGallery[i]);
        }
      } else if (
        this.studioObj[key] !== undefined &&
        this.studioObj[key] !== null
      ) {
        formdata.append(key, this.studioObj[key]);
      }
    }

    if (this.isprojectSave == false) {
      this.isprojectSave = true;
      if (form.valid) {
        this.AdminService.addStudio(formdata).subscribe((response: any) => {
          if (response.success === 1) {
            this.studioObj = {};
            this.isprojectSave = false;
            this.router.navigate(["/"]);
            this.toastr.success(response.message);
          } else {
            this.isprojectSave = false;
            this.toastr.error(response.message);
          }
        });
      } else {
        this.isprojectSave = false;
      }
    }
  }



}
