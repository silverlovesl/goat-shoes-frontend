import { StringUtils } from '../utils';

export class BaseModel {
  createdAt?: Date = null;
  updatedAt?: Date = null;
  init(input: any) {
    if (input.createdAt) {
      this.createdAt = new Date(input.createdAt);
    }
    if (input.updatedAt) {
      this.updatedAt = new Date(input.updatedAt);
    }
  }

  get formatCreatedAt(): string {
    return StringUtils.datetimeFormat(this.createdAt);
  }

  get formatUpdatedAt(): string {
    return StringUtils.datetimeFormat(this.updatedAt);
  }

  get shortCreatedAt(): string {
    return StringUtils.datetimeFormat(this.createdAt, 'YYYY/MM/DD HH:mm');
  }

  get shortUpdatedAt(): string {
    return StringUtils.datetimeFormat(this.updatedAt, 'YYYY/MM/DD HH:mm');
  }
}
