import { Component, OnInit } from '@angular/core';
import { UsersOrganizationsService } from '../../@core/services/users-organizations.service';
import { Pipeline, PipelineCreateInput, SmartTableSettings, UserOrganization } from '@gauzy/models';
import { Store } from '../../@core/services/store.service';
import { PipelinesService } from '../../@core/services/pipelines.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { TranslationBaseComponent } from '../../@shared/language-base/translation-base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  templateUrl: './pipelines.component.html',
  selector: 'ga-pipelines',
})
export class PipelinesComponent extends TranslationBaseComponent implements OnInit
{

  public pipelines = new LocalDataSource( [] as Pipeline[] );

  // public createInput: PipelineCreateInput = {} as any;

  public smartTableSettings: SmartTableSettings;

  public userOrganizations: UserOrganization[];

  public pipelineForm: FormGroup;

  // public isCreating = false;

  public constructor(
    private store: Store,
    private fb: FormBuilder,
    translateService: TranslateService,
    private pipelinesService: PipelinesService,
    private usersOrganizationsService: UsersOrganizationsService)
  {
    super( translateService );
  }

  public ngOnInit()
  {
    this.pipelineForm = this.fb.group({
      organizationId: [ '', Validators.required ],
      name: [ '', Validators.required ],
      id: [ '' ],
    });

    const { userId } = this.store;

    this.usersOrganizationsService
      .getAll( [ 'organization' ], { userId })
      .then( ({ items }) => {
        this.pipelineForm.patchValue({
          organizationId: items[0]?.organization?.id,
        });
        this.userOrganizations = items;
        this.updatePipelines();
      });
    this.smartTableSettings = {
      actions: false,
      columns: {
        name: {
          filter: false,
          editor: false,
          title: this.getTranslation( 'PIPELINES_PAGE.PIPELINE_NAME' ),
        },
      },
    };
  }

  // public get canCreate(): boolean {
  //   return !(this.isCreating
  //     || !this.createInput.name
  //     || !this.createInput.organizationId);
  // }

  public filterPipelines() {
    const { name: search } = this.pipelineForm.value;

    this.pipelines.setFilter([
      {
        field: 'name',
        search,
      },
    ]);
  }

  public updatePipelines(): void {
    const { organizationId } = this.pipelineForm.value;

    this.pipelinesService
      .find( [], { organizationId })
      .then( ({ items }) => this.pipelines.load( items ) );
  }

  public createPipeline() {
    // this.isCreating = true;
    // this.pipelinesService
    //   .create( this.createInput )
    //   .then( () => this.updatePipelines() )
    //   .finally( () => {
    //     delete this.createInput.name;
    //     this.isCreating = false;
    //     this.updatePipelines();
    //   });
  }

}
