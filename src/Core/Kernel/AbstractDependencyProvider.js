export class DependencyInjector {
    private dependencies: { [key: string]: any } = {};
  
    register(name: string, dependency: any) {
      this.dependencies[name] = dependency;
    }
  
    get(name: string): any {
      if (!this.dependencies[name]) {
        throw new Error(`Dependency "${name}" not registered`);
      }
      return this.dependencies[name];
    }
  }