import { Group } from 'src/app/groups/group-models/Group';
import { RofoComment } from './rofoComment';

export interface Rofo {
  Description: string;
  UploadedBy: {
    UserName: string;
  };
  Group: Group;
  Comments: RofoComment[];
  UploadedDate: Date;
  SecurityStamp: string;
}
