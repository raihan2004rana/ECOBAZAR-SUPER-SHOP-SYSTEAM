import { SetMetadata } from '@nestjs/common';

export const BRANCH_SCOPE_KEY = 'require_branch_scope';
export const RequireBranchScope = () => SetMetadata(BRANCH_SCOPE_KEY, true);
