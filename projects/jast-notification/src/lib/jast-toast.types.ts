export type JastToastType = 'success' | 'error' | 'info' | 'warning';

export type JastToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface JastToastStyles {
  tab?: string;
  icon?: string;
  title?: string;
  description?: string;
}

export interface JastToastAction {
  label: string;
  role: string;
}

export interface JastToastConfig {
  title: string;
  description?: string;
  type?: JastToastType;
  duration?: number;
  position?: JastToastPosition;
  styles?: JastToastStyles;
  actions?: JastToastAction[];
  progress?: boolean;
  persistent?: boolean;
}

export class JastToastRef implements PromiseLike<string | null> {
  constructor(
    private readonly _promise: Promise<string | null>,
    public readonly id: string,
    private readonly _dismiss: () => void
  ) {}

  then<TResult1 = string | null, TResult2 = never>(
    onfulfilled?: ((value: string | null) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this._promise.then(onfulfilled, onrejected);
  }

  dismiss(): void {
    this._dismiss();
  }
}

export type JastToastPromiseMessages = string | { title: string; description?: string };

export interface JastToastPromiseConfig {
  loading: JastToastPromiseMessages;
  success: JastToastPromiseMessages;
  error:   JastToastPromiseMessages;
  position?: JastToastPosition;
}
