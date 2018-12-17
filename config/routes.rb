Rails.application.routes.draw do
  resources :prescriptions, only: [:create] do
    collection do
      get :suggestions
    end
  end
end
