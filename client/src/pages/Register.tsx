import RegisterSvg from "../assets/register.svg";

const Register = () => {
  return (
    <div className="max-w-xl mx-auto my-12">
      <div className="flex items-center justify-center flex-col  mt-4">
        <img src={RegisterSvg} alt="register"  className="rounded-full w-40 h-40  shadow-md "/>
        <h1>Register</h1>
      </div>
    </div>
  );
};

export default Register;
