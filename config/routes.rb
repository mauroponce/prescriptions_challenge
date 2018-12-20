Rails.application.routes.draw do
  # TODO: version API
  resources :prescriptions, only: [:create, :show] do
    collection do
      get :suggestions
    end
  end
end
