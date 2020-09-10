import { Layout } from "../components/Layout";
import { useForm } from "react-hook-form";
import { withApollo } from "../utils/withApollo";
import { InputField } from "../components/InputField";
import { Button } from "@chakra-ui/core";
import { useRegisterMutation } from "../generated/graphql";

const Register: React.FC = ({}) => {
  const [register, { data, loading, error }] = useRegisterMutation();
  const { register: registerForm, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const response = await register({
      variables: { options: data },
    });

    if (response.data?.register.errors) {
      console.log(response.data?.register.errors);
    }
  };

  return (
    <Layout variant="small">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="username"
          label="username"
          ref={registerForm({ required: true })}
          errorMessage=""
        />
        <InputField
          name="email"
          label="email"
          ref={registerForm({ required: true })}
          errorMessage=""
        />
        <InputField
          name="password"
          label="password"
          type="password"
          ref={registerForm({ required: true })}
          errorMessage=""
        />
        <Button
          mt={4}
          type="submit"
          // isLoading={isSubmitting}
          variantColor="teal"
        >
          register
        </Button>
      </form>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Register);
