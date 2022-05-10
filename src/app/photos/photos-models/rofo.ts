import { Group } from 'src/app/groups/group-models/Group';
import { RofoComment } from './rofoComment';

export interface Rofo {
  description: string;
  uploadedBy: {
    userName: string;
  };
  group: Group;
  comments: RofoComment[];
  uploadedDate: Date;
  securityStamp: string;
}
