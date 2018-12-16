connection = ActiveRecord::Base.connection()

statements = <<-SQL
  DELETE FROM formulation_ingredients;
  DELETE FROM formulations;
  DELETE FROM ingredients;
  INSERT INTO ingredients values ('Admin');
  INSERT INTO categories values ('Supervisors');
SQL

statements.split(';').each do |s|
  connection.execute(s.strip) unless s.strip.empty?
end