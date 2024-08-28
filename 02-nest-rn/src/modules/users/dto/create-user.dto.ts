import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({message : "Name cannot be blank"})
  name: string;
  
  @IsNotEmpty()
  @IsEmail({} , {message:"Email is not in correct format"})
  email: string;

  @IsNotEmpty({message : "Password cannot be blank"})
  password: string;

  phone: string;
  address: string;
  image: string;
}
