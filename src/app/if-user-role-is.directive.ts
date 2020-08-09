import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from './user.service';

@Directive({
  selector: '[appIfUserRoleIs]'
})
export class IfUserRoleIsDirective {
  private hasView = false;
  private currentUserRole: string;
  private showForUserRole: string;
  constructor(
    private userService: UserService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
    this.userService.getUserRole().subscribe(role => {
      this.currentUserRole = role;
      this.updateView();
    });
  }

  @Input() set appIfUserRoleIs(role: string) {
    this.showForUserRole = role;
    this.updateView();
  }
  updateView() {
    const canView = this.canView(this.currentUserRole, this.showForUserRole)
    this.hasView = this.renderView(canView, this.hasView)
  }

  canView(currentRole: string, showForUserRole: string): boolean {
    return currentRole === showForUserRole;
  }

  renderView(show: boolean, hasView: boolean) {
    if (show && !hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      hasView = true;
    } else if (!show && hasView) {
      this.viewContainer.clear();
      hasView = false;
    }
    return hasView;
  }
}
