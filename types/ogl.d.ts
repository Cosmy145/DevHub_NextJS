declare module "ogl" {
  export class Renderer {
    constructor(options?: {
      dpr?: number;
      alpha?: boolean;
      antialias?: boolean;
      premultipliedAlpha?: boolean;
      preserveDrawingBuffer?: boolean;
      powerPreference?: string;
      autoClear?: boolean;
      webgl?: number;
    });
    gl: WebGLRenderingContext | WebGL2RenderingContext;
    dpr: number;
    setSize(width: number, height: number): void;
    render(options: {
      scene: any;
      camera?: any;
      target?: any;
      update?: boolean;
      sort?: boolean;
      frustumCull?: boolean;
    }): void;
  }

  export class Program {
    constructor(
      gl: WebGLRenderingContext | WebGL2RenderingContext,
      options?: {
        vertex?: string;
        fragment?: string;
        uniforms?: Record<string, any>;
        transparent?: boolean;
        cullFace?: number | null;
        frontFace?: number;
        depthTest?: boolean;
        depthWrite?: boolean;
        depthFunc?: number;
      }
    );
  }

  export class Triangle {
    constructor(
      gl: WebGLRenderingContext | WebGL2RenderingContext,
      options?: any
    );
  }

  export class Mesh {
    constructor(
      gl: WebGLRenderingContext | WebGL2RenderingContext,
      options?: {
        geometry?: any;
        program?: any;
        mode?: number;
        frustumCulled?: boolean;
        renderOrder?: number;
      }
    );
  }

  export class Geometry {
    constructor(
      gl: WebGLRenderingContext | WebGL2RenderingContext,
      attributes?: Record<string, any>
    );
  }

  export class Texture {
    constructor(
      gl: WebGLRenderingContext | WebGL2RenderingContext,
      options?: any
    );
  }

  export class Camera {
    constructor(options?: any);
  }

  export class Transform {
    constructor();
  }

  export class Vec2 {
    constructor(x?: number, y?: number);
  }

  export class Vec3 {
    constructor(x?: number, y?: number, z?: number);
  }

  export class Vec4 {
    constructor(x?: number, y?: number, z?: number, w?: number);
  }
}
